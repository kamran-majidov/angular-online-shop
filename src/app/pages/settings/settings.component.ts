import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { take } from "rxjs";

import { AuthService } from "../../services/auth.service";
import { IUser } from "../../types/user.interface";
import { MessageService } from "../../services/message.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {
  userForm: FormGroup;
  isLoadingUserData = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]],
      role: ["customer"],
      avatar: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData: IUser | null) => {
      if (userData) {
        this.userForm.patchValue(userData);
        this.isLoadingUserData = false;
      }
    });
  }

  updateUser(): void {
    if (this.userForm.valid) {
      this.authService.userData$
        .pipe(take(1))
        .subscribe((currentUserData: IUser | null) => {
          const updatedUser: IUser = {
            ...this.userForm.value,
            id: currentUserData?.id,
          };
          this.authService.updateUser(updatedUser).subscribe({
            next: (response: IUser) => {
              this.messageService.showSuccess(
                `${response.name}, information has been updated`
              );
            },
            error: (error: HttpErrorResponse) => {
              this.messageService.showError(error);
            },
          });
        });
    }
  }
}
