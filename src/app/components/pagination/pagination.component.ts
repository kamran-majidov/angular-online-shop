import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() limitChanged = new EventEmitter<number>();
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
