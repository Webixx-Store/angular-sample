import { createFeatureSelector, createSelector } from '@ngrx/store';
import { headerFeatureKey } from '../reducers/header.reducer';

export interface HeaderState {
  items: any [];
  isHeader: Boolean;
}

export const getHeader = createFeatureSelector<HeaderState>(headerFeatureKey);
export const getIsHeader = createSelector(
    getHeader,
  (state: HeaderState) => state.isHeader
);


