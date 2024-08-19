import { ProductResponseModel } from './../model/product-response.model';
import { createReducer, on } from '@ngrx/store';
import { ProductState } from '../selectors/product.selector';
import { ProductModel } from '../model/product.model';
import { productActionSuscess } from '../actions/product.action';

export const productFeatureKey = 'productKey';

export const initialState: ProductState = {
products: {} as  ProductResponseModel
}

export const productReducer = createReducer(
  initialState,
  on(productActionSuscess, (state, { items }) => ({...state, products: items})),
);
