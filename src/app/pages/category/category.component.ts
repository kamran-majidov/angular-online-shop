import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IProduct } from "../../types/product.interface";
import { CategoriesService } from "../../services/categories.service";
import { MessageService } from "../../services/message.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
})
export class CategoryComponent implements OnInit {
  limit = 0;
  isLoading = true;
  products!: IProduct[];
  id: string = "";

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    this.loadProductsByCategory();
  }

  loadProductsByCategory() {
    this.categoriesService.getCategoryProducts(this.id).subscribe({
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
