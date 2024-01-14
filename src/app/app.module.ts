import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { NgOptimizedImage } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { SearchComponent } from "./components/search/search.component";
import { MainComponent } from "./components/main/main.component";
import { ToastComponent } from "./components/toast/toast.component";
import { ProductSliderComponent } from "./components/product-slider/product-slider.component";
import { CategoryComponent } from "./pages/category/category.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { CartComponent } from "./components/cart/cart.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NoDataComponent } from "./components/no-data/no-data.component";
import { LoadingIndicatorComponent } from "./components/loading-indicator/loading-indicator.component";
import { ProductsComponent } from "./pages/products/products.component";
import { HomeComponent } from "./pages/home/home.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { ProductComponent } from "./pages/product/product.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { EditorComponent } from "./pages/editor/editor.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { TruncatePipe } from "./components/products-list/truncate.pipe";
import { SettingsComponent } from "./pages/settings/settings.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ImageErrorHandlerDirective } from "./image-error-handler.directive";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    MainComponent,
    ProductsComponent,
    HomeComponent,
    CategoriesComponent,
    ProductComponent,
    ToastComponent,
    ProductSliderComponent,
    EditorComponent,
    CategoryComponent,
    PaginationComponent,
    ProductsListComponent,
    CartComponent,
    ModalComponent,
    NoDataComponent,
    LoadingIndicatorComponent,
    SignUpComponent,
    SignInComponent,
    TruncatePipe,
    SettingsComponent,
    ProductFormComponent,
    ImageErrorHandlerDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
