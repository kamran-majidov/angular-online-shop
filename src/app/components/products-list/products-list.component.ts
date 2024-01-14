import { Component, Input } from "@angular/core";

import { IProduct } from "../../types/product.interface";
import { AuthService } from "../../services/auth.service";
import { FavoritesService } from "../../services/favorites.service";
import { CartService } from "../../services/cart.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
})
export class ProductsListComponent {
  @Input() products!: IProduct[];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 12;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  public onPageChange(newPage: number): void {
    this.currentPage = newPage;
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
