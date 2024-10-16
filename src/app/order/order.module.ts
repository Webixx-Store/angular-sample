import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ShoesProductListComponent } from './shoes-product-list/shoes-product-list.component';

import { productFeatureKey, productReducer } from '../reducers/product.reducer';
import { ProductEffect } from '../effects/product.effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PipeModule } from '../pipe/pipe.module';
import { orderFeatureKey, orderReducer } from '../reducers/order.reducer';
import { OrderEffect } from '../effects/order.effect';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AddProductComponent } from './add-product/add-product.component';
@NgModule({
  declarations: [
    ShoesProductListComponent,
    OrderDetailComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ComponentsModule,
    ProductDetailModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    CheckoutModule,
    StoreModule.forFeature(productFeatureKey,productReducer),
    EffectsModule.forFeature([ProductEffect]),

    StoreModule.forFeature(orderFeatureKey, orderReducer),
    EffectsModule.forFeature([OrderEffect]),
  ]
})
export class OrderModule { }
