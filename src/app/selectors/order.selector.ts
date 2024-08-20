import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResultModel } from '../model/result.model';
import { orderFeatureKey } from '../reducers/order.reducer';



export interface OrderState {
  resultSaveOrder: ResultModel;
}

export const getOrderState = createFeatureSelector<OrderState>(orderFeatureKey);

export const getResultSaveOrders = createSelector(
   getOrderState,
  (state: OrderState) => state.resultSaveOrder
);




