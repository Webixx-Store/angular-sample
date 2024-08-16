import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getTestConnectAction } from 'src/app/actions/coin.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { DateUtils } from 'src/app/common/util/date.util';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ResultModel } from 'src/app/model/result.model';
import { CoinState, getTestConnect } from 'src/app/selectors/coin.selector';
import { HeaderState, getIsHeader } from 'src/app/selectors/header.selector';

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



  constructor(private headerStore: Store<HeaderState>,
    private router: Router,
    private coinStore: Store<CoinState>) {
    this.isHeader$ = this.headerStore.select(getIsHeader);
    this.resultConnect$ = this.coinStore.select(getTestConnect);
  }
  ngOnInit(): void {

    if(Number(AuthDetail.getLoginedInfo()?.logoutDate) <= Number(DateUtils.getCurrFullDateTimeStrBlank())){
      AuthDetail.actionLogOut();
      window.location.href = '/';
    }

    if (this.isLogin) {
      this.coinStore.dispatch(getTestConnectAction());
      this.wellcome = "Wellcome to " + String(AuthDetail.getLoginedInfo()?.email)
    }

    this.isHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isHeader = Boolean(res)
      } else {
        this.isHeader = true;
      }
    })

    this.resultConnect$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        if(res.retCode == 'OK'){
          this.isConnect = true;
        }else{
          this.isConnect = false;
        }
      }
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
