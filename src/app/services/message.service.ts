import { Injectable } from "@angular/core";
import { ToastService } from "./toast.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(private toastService: ToastService) {}

  showError(errorResponse: HttpErrorResponse | string): void {
    const errorMessage =
      typeof errorResponse === "string"
        ? errorResponse
        : this.extractErrorMessage(errorResponse);
    this.toastService.openToast(errorMessage, "error");
  }

  showSuccess(successMessage: string): void {
    this.toastService.openToast(successMessage, "success");
  }

  private extractErrorMessage(errorResponse: HttpErrorResponse): string {
    const errorData: { message?: string | string[] } = errorResponse.error as {
      message?: string | string[];
    };
    if (errorData && errorData.message) {
      return this.formatErrorMessage(errorData.message);
    }
    return "An error occurred";
  }

  private formatErrorMessage(message: string | string[]): string {
    if (Array.isArray(message)) {
      return message.join(", ");
    }
    return message;
  }
}
