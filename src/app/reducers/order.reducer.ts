
import { createReducer, on } from '@ngrx/store';
import { ResultModel } from '../model/result.model';
import { OrderState } from '../selectors/order.selector';
import {  orderCheckoutActionSuscess } from '../actions/order.action';

export const orderFeatureKey = 'orderKey';

export const initialState: OrderState = {
   resultSaveOrder : {} as ResultModel
}

export const orderReducer = createReducer(
  initialState,
  on(orderCheckoutActionSuscess, (state, { result }) => ({...state, resultSaveOrder: result})),
);
