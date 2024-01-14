import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IProduct } from "../../types/product.interface";
import { ProductsService } from "../../services/products.service";
import { MessageService } from "../../services/message.service";
import { ModalService } from "../../services/modal.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
})
export class ProductFormComponent implements OnInit {
  @Input() productToEdit!: IProduct;
  @Output() submitProduct = new EventEmitter<IProduct>();
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(6)]],
      price: ["", [Validators.required, Validators.min(1)]],
      description: ["", Validators.required],
      images: ["", Validators.required],
    });

    if (this.productToEdit) {
      this.productForm.patchValue({
        title: this.productToEdit.title,
        price: this.productToEdit.price,
        description: this.productToEdit.description,
        images: this.productToEdit.images.join(","),
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value }; // Указать тип IProduct
      formData.id = this.productToEdit.id;
      formData.images = formData.images
        .split(",")
        .map((link: string) => link.trim());

      this.productsService.updateProduct(formData).subscribe({
        next: () => {
          this.messageService.showSuccess(
            "Product has been successfully updated!"
          );
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.showError(error);
        },
        complete: () => {
          this.modalService.closeModal();
        },
      });
    }
  }
}
