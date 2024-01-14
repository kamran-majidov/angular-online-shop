import { Component, Input, OnInit } from "@angular/core";

import { ProductsService } from "../../services/products.service";
import { IProduct } from "../../types/product.interface";
import { ModalService } from "../../services/modal.service";
import { MessageService } from "../../services/message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
})
export class EditorComponent implements OnInit {
  products: IProduct[] | null = null;
  searchQuery = "";
  searchQuerySubject = new Subject<string>();
  isLoading = true;
  @Input() currentPage: number = 0;
  @Input() itemsPerPage: number = 20;

  selectedProductForEdit: IProduct | null = null;

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.loadProducts();

    this.searchQuerySubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.search(query);
      });
  }
  public onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  edit(product: IProduct) {
    this.selectedProductForEdit = product;
    this.openModal();
  }
  delete(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.messageService.showSuccess("Product deleted successfully.");
        this.loadProducts();
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.showError(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private loadProducts() {
    this.productsService.getProducts(this.itemsPerPage).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.showError(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onSearchQueryChanged(query: string): void {
    this.searchQuerySubject.next(query);
  }
  search(query: string): void {
    this.isLoading = true;
    this.productsService.searchProducts(query).subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.showError(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
    this.selectedProductForEdit = null;
  }
}
