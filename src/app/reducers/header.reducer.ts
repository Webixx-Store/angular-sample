import { createReducer, on } from '@ngrx/store';
import { DateUtils } from '../common/util/date.util';
import { ConvertUtil } from '../common/util/convert.util';
import { HeaderState } from '../selectors/header.selector';
import { setIsHeader } from '../actions/header.action';


export const headerFeatureKey = 'headerKey';

export const initialState: HeaderState = {
  items : [] as [],
  isHeader: {} as Boolean
}

export const headerReducer = createReducer(
  initialState,
  on(setIsHeader, (state, { isHeader }) => ({...state, isHeader:isHeader })),
);