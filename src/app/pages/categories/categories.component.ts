import { Component, OnInit } from "@angular/core";

import { ICategory } from "../../types/category.interface";
import { CategoriesService } from "../../services/categories.service";
import { MessageService } from "../../services/message.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}
  categories: ICategory[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
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
