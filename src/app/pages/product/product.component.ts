import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IProduct } from "../../types/product.interface";
import { ProductsService } from "../../services/products.service";
import { MessageService } from "../../services/message.service";
import { CartService } from "../../services/cart.service";
import { FavoritesService } from "../../services/favorites.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class ProductComponent implements OnInit {
  id: string | null = null;
  isLoading = true;
  product: IProduct | null = null;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private messageService: MessageService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  loadProduct() {
    if (this.id) {
      this.productsService.getProduct(this.id).subscribe({
        next: (data) => {
          this.product = data;
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

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.loadProduct();
  }

  addOrRemoveFromFavorites(product: IProduct): void {
    if (this.favoritesService.isFavorite(product.id)) {
      this.favoritesService.removeFavorite(product.id);
    } else {
      this.favoritesService.addToFavorites(product);
    }
  }
  addOrRemoveFromCart(product: IProduct): void {
    if (this.cartService.isProductInCart(product.id)) {
      this.cartService.removeFromCart(product.id);
    } else {
      this.cartService.addToCart(product);
    }
  }

  isFavorite(product: IProduct): boolean {
    return this.favoritesService.isFavorite(product.id);
  }

  isProductInCart(productId: number): boolean {
    return this.cartService.isProductInCart(productId);
  }
}
