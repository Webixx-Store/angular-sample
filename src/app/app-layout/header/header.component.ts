import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getTestConnectAction } from 'src/app/actions/coin.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { DateUtils } from 'src/app/common/util/date.util';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ResultModel } from 'src/app/model/result.model';
import { AuthState, getCartNumber } from 'src/app/selectors/auth.selector';
import { CoinState, getTestConnect } from 'src/app/selectors/coin.selector';
import { HeaderState, getIsHeader } from 'src/app/selectors/header.selector';
import { CartService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subMenu: any = [];
  isHeader$ = new Observable<Boolean>();
  isHeader: boolean = true;
  isLogin: boolean = AuthDetail.isLogin();
  wellcome: string = ''
  isConnect:boolean = false;
  resultConnect$ =  new Observable<ResultModel>();
  quantityCart$ = new Observable<number>();
  quantityCart :number = 0;



  constructor(private headerStore: Store<HeaderState>,private authStore: Store<AuthState>,
    private router: Router, private cartService: CartService,
    private coinStore: Store<CoinState>) {
    this.isHeader$ = this.headerStore.select(getIsHeader);
    this.resultConnect$ = this.coinStore.select(getTestConnect);
    this.quantityCart$ = this.authStore.select(getCartNumber)
  }
  ngOnInit(): void {

    if(Number(AuthDetail.getLoginedInfo()?.logoutDate) <= Number(DateUtils.getCurrFullDateTimeStrBlank(new Date()))){
      AuthDetail.actionLogOut();
      window.location.href = '/';
    }

    if (this.isLogin) {
     // this.coinStore.dispatch(getTestConnectAction());
      this.wellcome = "Wellcome to " + String(AuthDetail.getLoginedInfo()?.email)
    }

    this.isHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isHeader = Boolean(res)
      } else {
        this.isHeader = true;
      }
    })

    // this.resultConnect$.subscribe(res =>{
    //   if(ValidationUtil.isNotNullAndNotEmpty(res)){
    //     if(res.code == 'OK'){
    //       this.isConnect = true;
    //     }else{
    //       this.isConnect = false;
    //     }
    //   }
    // })
    this.quantityCart = this.cartService.getCart(String(AuthDetail.getLoginedInfo()?.id)).length;
    this.quantityCart$.subscribe(res => {
        this.quantityCart = res;
    })
  }



  findChildrenByName(menuData: any, categoryName: any) {
    for (const category of menuData) {
      if (category.name === categoryName) {
        return category.children;
      } else {
        for (const subCategory of category.children) {
          if (subCategory.name === categoryName) {
            return subCategory.children;
          }
        }
      }
    }

    return null; // Return null if the category name is not found
  }


  logOut() {
    AuthDetail.actionLogOut();
    window.location.href = "/"
  }

}
