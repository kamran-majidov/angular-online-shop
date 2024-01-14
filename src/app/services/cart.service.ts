import { Injectable } from "@angular/core";

import { BehaviorSubject, map } from "rxjs";

import { IProduct } from "../types/product.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public showCart = false;

  private items: { product: IProduct; quantity: number }[] = [];
  private itemsSubject = new BehaviorSubject<
    { product: IProduct; quantity: number }[]
  >([]);
  public cartItemCount$ = this.itemsSubject
    .asObservable()
    .pipe(
      map((items) => items.reduce((count, item) => count + item.quantity, 0))
    );
  subtotal = 0;

  constructor() {}

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  addToCart(product: IProduct): void {
    const existingItem = this.findCartItem(product);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
      this.itemsSubject.next(this.items);
    }
    this.updateSubtotal();
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.itemsSubject.next(this.items);
    this.updateSubtotal();
  }

  decreaseQuantity(product: IProduct): void {
    const existingItem = this.findCartItem(product);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      this.removeFromCart(product.id);
    }
    this.updateSubtotal();
  }

  increaseQuantity(product: IProduct): void {
    const existingItem = this.findCartItem(product);
    if (existingItem) {
      existingItem.quantity++;
    }
    this.updateSubtotal();
  }

  getItems(): { product: IProduct; quantity: number }[] {
    return this.items;
  }

  isProductInCart(productId: number): boolean {
    return this.items.some((item) => item.product.id === productId);
  }

  private updateSubtotal(): void {
    this.subtotal = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  private findCartItem(
    product: IProduct
  ): { product: IProduct; quantity: number } | undefined {
    return this.items.find((item) => item.product.id === product.id);
  }
}
