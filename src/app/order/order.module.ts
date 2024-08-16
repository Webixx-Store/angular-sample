import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ShoesProductListComponent } from './shoes-product-list/shoes-product-list.component';
@NgModule({
  declarations: [
    CheckoutComponent,
    ShoesProductListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
