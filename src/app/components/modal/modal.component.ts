import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  @Input() customTitle = "Default Header";
  @Output() closeModal = new EventEmitter<void>();

  constructor(private modalService: ModalService) {}

  get isOpen() {
    return this.modalService.isOpen$;
  }

  close() {
    this.modalService.closeModal();
    this.closeModal.emit();
  }
}
