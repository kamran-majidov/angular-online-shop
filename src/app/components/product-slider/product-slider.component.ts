import { Component, Input } from "@angular/core";

import { IProduct } from "../../types/product.interface";

@Component({
  selector: "app-product-slider",
  templateUrl: "./product-slider.component.html",
  styleUrls: ["./product-slider.component.css"],
})
export class ProductSliderComponent {
  @Input() product!: IProduct;
  currentSlideIndex: number = 0;
  constructor() {}

  changeSlide(direction: "next" | "prev"): void {
    if (!this.isValidImageArray()) return;

    this.currentSlideIndex = this.calculateNewIndex(direction);
  }

  setCurrentSlide(slideIndex: number): void {
    if (this.isValidIndex(slideIndex)) {
      this.currentSlideIndex = slideIndex;
    }
  }

  private isValidImageArray(): boolean {
    return (
      this.product && this.product.images && this.product.images.length > 0
    );
  }

  private calculateNewIndex(direction: "next" | "prev"): number {
    const totalImages = this.product.images.length;
    const adjustment = direction === "next" ? 1 : -1;
    return (this.currentSlideIndex + adjustment + totalImages) % totalImages;
  }

  private isValidIndex(index: number): boolean {
    return index >= 0 && index < this.product.images.length;
  }
}
