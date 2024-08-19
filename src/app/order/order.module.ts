import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ShoesProductListComponent } from './shoes-product-list/shoes-product-list.component';

import { productFeatureKey, productReducer } from '../reducers/product.reducer';
import { ProductEffect } from '../effects/product.effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
    ReactiveFormsModule,
    StoreModule.forFeature(productFeatureKey,productReducer),
    EffectsModule.forFeature([ProductEffect]),
  ]
})
export class OrderModule { }
