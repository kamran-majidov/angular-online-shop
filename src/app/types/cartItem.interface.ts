import { IProduct } from "./product.interface";

export interface CartItem {
  product: IProduct;
  quantity: number;
}
