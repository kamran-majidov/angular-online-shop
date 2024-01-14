import { Component, OnInit } from "@angular/core";

import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}
  message = "";
  messageType: "success" | "error" = "success";

  private timerId = 0;

  ngOnInit() {
    this.toastService.currentMessage.subscribe((messageData) => {
      this.message = messageData.message;
      this.messageType = messageData.type;

      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      if (this.message) {
        this.timerId = setTimeout(() => {
          this.close();
        }, 5500);
      }
    });
  }

  close() {
    this.toastService.closeToast();
  }
}
