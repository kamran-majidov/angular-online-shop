import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { ICategory } from "../types/category.interface";
import { IProduct } from "../types/product.interface";
import { environment } from "../../../environment";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCategories(limit = 100): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      `${this.API_URL}categories/?limit=${limit}`
    );
  }

  getCategoryProducts(
    id: string,
    page = 0,
    limit = 100
  ): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.API_URL}categories/${id}/products?offset=${page}&limit=${limit}`
    );
  }
}
