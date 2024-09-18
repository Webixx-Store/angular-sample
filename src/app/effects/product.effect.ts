import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../service/product.service';
import { getRewiewsAction, getRewiewsActionFail, getRewiewsActionSuscess, productAction, productActionFail, productActionSuscess, saveProductRewiewAction, saveProductRewiewActionFail, saveProductRewiewActionSuscess } from '../actions/product.action';




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

  saveProductRewiew$ = createEffect(() => this._actions$.pipe(
    ofType(saveProductRewiewAction),
    mergeMap(({params}) => this.productService.saveProductRewiew(params).pipe(
      map(res => saveProductRewiewActionSuscess({result:res})),
      catchError(msg => of(saveProductRewiewActionFail({ msg: msg.message })))
    ))
  ));

  rewiewSearch$ = createEffect(() => this._actions$.pipe(
    ofType(getRewiewsAction),
    mergeMap(({params}) => this.productService.getProductRewiew(params).pipe(
      map(res => getRewiewsActionSuscess({items:res})),
      catchError(msg => of(getRewiewsActionFail({ msg: msg.message })))
    ))
  ));







}
