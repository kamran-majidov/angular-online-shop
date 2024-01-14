import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { IProduct } from "../types/product.interface";

@Injectable({
  providedIn: "root",
})
export class FavoritesService {
  private storageKey = "favorites";
  private favoritesSubject = new BehaviorSubject<IProduct[]>(
    this.loadFavorites()
  );
  public favoritesCount$ = this.favoritesSubject
    .asObservable()
    .pipe(map((favorites) => favorites.length));

  private loadFavorites(): IProduct[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? (JSON.parse(favorites) as IProduct[]) : [];
  }

  addToFavorites(product: IProduct): void {
    const favorites = this.loadFavorites();
    if (!favorites.some((p) => p.id === product.id)) {
      favorites.push(product);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    }
  }

  removeFavorite(productId: number): void {
    const favorites = this.loadFavorites();
    const updatedFavorites = favorites.filter((p) => p.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedFavorites));
    this.favoritesSubject.next(updatedFavorites);
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.some((p) => p.id === productId);
  }
}
