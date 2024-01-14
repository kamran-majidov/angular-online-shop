import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { IUser } from "../types/user.interface";
import { environment } from "../../../environment";
import { AuthResponse } from "../types/auth.interface";

import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<IUser | null>(null);
  public userData$ = this.userSubject.asObservable();

  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  API_URL = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.initAuth();
  }

  private initAuth(): void {
    const tokens = this.retrieveTokens();
    if (tokens) {
      this.updateAuthState(tokens.accessToken, tokens.refreshToken);
    }
  }

  private retrieveTokens(): {
    accessToken: string;
    refreshToken: string;
  } | null {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  }

  private updateAuthState(accessToken: string, refreshToken: string): void {
    this.loggedInSubject.next(true);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    this.fetchUserData();
  }

  private fetchUserData(): void {
    if (this.accessToken) {
      this.http
        .get<IUser>(`${this.API_URL}auth/profile`, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .subscribe({
          next: (userData) => this.userSubject.next(userData),
          error: (error: HttpErrorResponse) => {
            this.messageService.showError(error);
            this.userSubject.next(null);
          },
        });
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}auth/login`, { email, password })
      .pipe(tap((data: AuthResponse) => this.onLoginSuccess(data)));
  }

  private onLoginSuccess(response: AuthResponse): void {
    if (response.access_token && response.refresh_token) {
      this.updateAuthState(response.access_token, response.refresh_token);
    }
  }

  register(
    user: IUser
  ): Observable<{ access_token: string; refresh_token: string }> {
    return this.http.post<AuthResponse>(`${this.API_URL}users`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.API_URL}users/${user.id}`, user, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .pipe(
        tap((updatedUser) => this.userSubject.next(updatedUser)),
        catchError((error: HttpErrorResponse) =>
          this.onError("Failed to update profile", error)
        )
      );
  }

  logout(): void {
    this.loggedInSubject.next(false);
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.userSubject.next(null);
    this.router.navigate(["/"]);
  }

  private onError(
    message: string,
    error: HttpErrorResponse
  ): Observable<never> {
    this.messageService.showError(message);
    return throwError(error);
  }
}
