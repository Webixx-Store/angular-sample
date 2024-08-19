import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoesProductListComponent } from './shoes-product-list/shoes-product-list.component';

const routes: Routes = [
  {path:'checkout' , component:CheckoutComponent},
  {path:'' , component:ShoesProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
