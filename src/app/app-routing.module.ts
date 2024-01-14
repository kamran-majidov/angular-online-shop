import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProductsComponent } from "./pages/products/products.component";
import { HomeComponent } from "./pages/home/home.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { ProductComponent } from "./pages/product/product.component";
import { EditorComponent } from "./pages/editor/editor.component";
import { CategoryComponent } from "./pages/category/category.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { SettingsComponent } from "./pages/settings/settings.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "products/:id",
    component: ProductComponent,
  },
  {
    path: "categories",
    component: CategoriesComponent,
  },
  {
    path: "categories/:id",
    component: CategoryComponent,
  },
  {
    path: "editor",
    component: EditorComponent,
  },
  {
    path: "sign-up",
    component: SignUpComponent,
  },
  {
    path: "sign-in",
    component: SignInComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
