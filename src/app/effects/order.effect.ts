import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoinService } from '../service/coin.service';
import { getAccountInfoAction, getAccountInfoActionSuscess, getAccountInfoActionFail, getTestConnectAction, getTestConnectActionSuscess, addKeyAction, addKeyActionSuscess, addKeyActionFail, getListCoin, getListCoinSuscess, getListCoinFail } from '../actions/coin.action';
import { OrderService } from '../service/order.service';
import { orderCheckoutAction, orderCheckoutActionFail, orderCheckoutActionSuscess } from '../actions/order.action';





@Injectable()
export class OrderEffect {

  constructor(
    private _actions$: Actions,
    private OrderService:OrderService
  ) { }

  OrderSearch$ = createEffect(() => this._actions$.pipe(
    ofType(orderCheckoutAction),
    mergeMap(({params}) => this.OrderService.saveOrder(params).pipe(
      map(res => orderCheckoutActionSuscess({result:res})),
      catchError(msg => of(orderCheckoutActionFail({ msg: msg.message })))
    ))
  ));







}