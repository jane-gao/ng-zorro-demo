import {NgModule} from "@angular/core";
import {ProductComponent} from "./product/product.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ProductService} from "./product.service";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'productManager', component: ProductComponent},
  {path: 'productDetail', component: ProductDetailComponent}
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [ProductComponent, ProductListComponent, ProductDetailComponent],
  providers: [ProductService]
})
export class ProductModule {
}
