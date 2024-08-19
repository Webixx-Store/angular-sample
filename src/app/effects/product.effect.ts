import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoinService } from '../service/coin.service';
import { getAccountInfoAction, getAccountInfoActionSuscess, getAccountInfoActionFail, getTestConnectAction, getTestConnectActionSuscess, addKeyAction, addKeyActionSuscess, addKeyActionFail, getListCoin, getListCoinSuscess, getListCoinFail } from '../actions/coin.action';
import { ProductService } from '../service/product.service';
import { productAction, productActionFail, productActionSuscess } from '../actions/product.action';




@Injectable()
export class ProductEffect {

  constructor(
    private _actions$: Actions,
    private productService:ProductService
  ) { }

  productSearch$ = createEffect(() => this._actions$.pipe(
    ofType(productAction),
    mergeMap(({params}) => this.productService.allProduct(params).pipe(
      map(res => productActionSuscess({items:res})),
      catchError(msg => of(productActionFail({ msg: msg.message })))
    ))
  ));







}
