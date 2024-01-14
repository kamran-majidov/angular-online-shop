import { Component } from "@angular/core";

import { CartService } from "../../services/cart.service";
import { CartItem } from "../../types/cartItem.interface";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  decreaseQuantity(item: CartItem) {
    this.cartService.decreaseQuantity(item.product);
  }

  increaseQuantity(item: CartItem) {
    this.cartService.increaseQuantity(item.product);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
