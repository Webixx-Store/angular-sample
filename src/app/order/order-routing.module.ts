import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoesProductListComponent } from './shoes-product-list/shoes-product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {path:'checkout' , component:CheckoutComponent},
  {path:'detail/:product' , component:ProductDetailComponent},
  {path:'order-detail' , component:OrderDetailComponent},
  {path:'' , component:ShoesProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
