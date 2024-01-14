import { Component, OnInit } from "@angular/core";

import { IProduct } from "../../types/product.interface";
import { ProductsService } from "../../services/products.service";
import { MessageService } from "../../services/message.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
})
export class ProductsComponent implements OnInit {
  products: IProduct[] | null = null;
  isLoading: boolean = true;
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productsService.getProducts(20).subscribe({
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
}
