import { Component, OnInit } from '@angular/core';
import { MexcModel } from '../model/mexc.model';
import { Observable } from 'rxjs';
import { CoinState, getCoins } from '../selectors/coin.selector';
import { Store } from '@ngrx/store';
import { getListCoin } from '../actions/coin.action';
import { setShowOverlayLoading } from '../actions/overlay-loading.action';
import { OverlayLoadingState } from '../selectors/overlay-loading.selector';
import { ValidationUtil } from '../common/util/validation.util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  items$ = new Observable<MexcModel []>();
  items= [] as MexcModel [];
  itemChoose : MexcModel  = {} as MexcModel;
  symbol:string = "";
  constructor(private coinStore : Store<CoinState> ) {
      this.items$ = this.coinStore.select(getCoins);
    }

  ngOnInit(): void {

    this.searchSymBol();
    this.items$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.items = res;
        this.itemChoose = res[0]
     //   this._overloading.dispatch(setShowOverlayLoading({loading:false}));
      }
    })
  }

  handelCoin(item:MexcModel){
    this.itemChoose = item;
  }

  searchSymBol(){
   // this._overloading.dispatch(setShowOverlayLoading({loading:true}));
    this.coinStore.dispatch(getListCoin({symbol:this.symbol== "" ? "*" : this.symbol}));
  }




}
