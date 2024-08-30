import { ProductResponseModel } from './../../model/product-response.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, observable } from 'rxjs';
import { productAction } from 'src/app/actions/product.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ProductModel } from 'src/app/model/product.model';
import { getProducts, ProductState } from 'src/app/selectors/product.selector';
import { CartService } from 'src/app/service/cart-service.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isPopupOpen = true;
  product$ = new Observable<ProductResponseModel>();

  product : ProductModel = {} as ProductModel;
  constructor(private route: ActivatedRoute , private productStore: Store<ProductState>,
    private cartService : CartService,
    private toastr: ToastrService
  ) {
    this.product$ = this.productStore.select(getProducts);
  }
  productId:string = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = String(params.get('product'));
      this.productStore.dispatch(productAction({params:{
        id:this.productId
      }}))
    });

    this.product$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.product = res.products[0];
      }
    })
  }

  closePopup():void{
    this.isPopupOpen = false;
  }

  clickBuy(item:ProductModel):void{
    const id =  AuthDetail.getLoginedInfo()?.id;

    this.cartService.addToCart(String(id), item, 1 );

    this.toastr.success("Add Cart suscess")


  }

}
