import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { IProduct } from "../types/product.interface";
import { environment } from "../../../environment";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getProducts(limit = 0): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API_URL}products?limit=${limit}`);
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API_URL}products/${id}`);
  }

  deleteProduct(id: number) {
    return this.http.delete<boolean>(`${this.API_URL}products/${id}`);
  }

  searchProducts(query: string, limit = 100): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.API_URL}products?title=${query}&limit=${limit}`
    );
  }

  updateProduct(data: IProduct) {
    return this.http.put<IProduct>(`${this.API_URL}products/${data.id}`, data);
  }
}
