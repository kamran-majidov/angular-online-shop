import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "../../services/auth.service";
import { MessageService } from "../../services/message.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
})
export class SignInComponent {
  signInForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.attemptLogin();
    }
  }

  private attemptLogin(): void {
    const email: string = this.signInForm.get("email")?.value;
    const password: string = this.signInForm.get("password")?.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.messageService.showSuccess("You have successfully logged in.");
        this.router.navigate(["/"]);
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.showError(error);
      },
    });
  }
}
