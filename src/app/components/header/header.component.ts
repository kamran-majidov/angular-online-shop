import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { CartService } from "../../services/cart.service";
import { AuthService } from "../../services/auth.service";
import { FavoritesService } from "../../services/favorites.service";
import { IUser } from "../../types/user.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  currentUser$: Observable<IUser | null>;
  favoritesCount$: Observable<number>;
  cartItemCount$: Observable<number>;
  isLoggedIn$: Observable<boolean>;
  userMenuVisible = false;

  defaultUserIcon: string =
    "https://www.creativefabrica.com/wp-content/uploads/2021/09/09/User-avatar-profile-icon-Graphics-17068385-1.jpg";
  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.userData$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.favoritesCount$ = this.favoritesService.favoritesCount$;
    this.cartItemCount$ = this.cartService.cartItemCount$;
  }

  toggleUserMenu() {
    this.userMenuVisible = !this.userMenuVisible;
  }

  toggleCartMenu() {
    this.cartService.toggleCart();
  }

  openUserMenu() {
    this.userMenuVisible = true;
  }
  closeUserMenu() {
    setTimeout(() => {
      this.userMenuVisible = false;
    }, 800);
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUser$;
  }

  logout() {
    this.authService.logout();
  }
}
