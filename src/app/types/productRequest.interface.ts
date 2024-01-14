import { ICategory } from "./category.interface";

export interface ProductRequest {
  id?: number;
  title: string;
  price: number;
  description: string;
  category?: ICategory;
  categoryId: number;
  images: string;
}
