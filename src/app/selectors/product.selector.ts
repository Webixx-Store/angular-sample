import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey } from '../reducers/product.reducer';
import { ProductModel } from '../model/product.model';
import { ProductResponseModel } from '../model/product-response.model';



export interface ProductState {
  products:  ProductResponseModel;
}

export const getProductState = createFeatureSelector<ProductState>(productFeatureKey);

export const getProducts = createSelector(
   getProductState,
  (state: ProductState) => state.products
);




