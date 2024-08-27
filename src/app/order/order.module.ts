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
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PipeModule } from '../pipe/pipe.module';
import { orderFeatureKey, orderReducer } from '../reducers/order.reducer';
import { OrderEffect } from '../effects/order.effect';
import { OrderDetailComponent } from './order-detail/order-detail.component';
@NgModule({
  declarations: [
    CheckoutComponent,
    ShoesProductListComponent,
    ProductDetailComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    StoreModule.forFeature(productFeatureKey,productReducer),
    EffectsModule.forFeature([ProductEffect]),

    StoreModule.forFeature(orderFeatureKey, orderReducer),
    EffectsModule.forFeature([OrderEffect]),
  ]
})
export class OrderModule { }
