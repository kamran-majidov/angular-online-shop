import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private messageSource = new BehaviorSubject<{
    message: string;
    type: "success" | "error";
  }>({
    message: "",
    type: "success",
  });

  currentMessage = this.messageSource.asObservable();

  constructor() {}

  openToast(message: string, type: "success" | "error" = "success") {
    this.messageSource.next({ message, type });
  }

  closeToast() {
    this.messageSource.next({ message: "", type: "success" });
  }
}
