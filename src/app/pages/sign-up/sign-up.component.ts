import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import { MessageService } from "../../services/message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IUser } from "../../types/user.interface";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]],
      role: ["customer"],
      avatar: [
        "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/),
        ],
      ],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const user: IUser = { ...this.signUpForm.value };
    this.authService.register(user).subscribe({
      next: () => {
        this.messageService.showSuccess("You have successfully registered.");
        this.router.navigate(["/sign-in"]);
        this.signUpForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.showError(error);
      },
    });
  }
}
