import { CartService } from './../../service/cart-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ProductModel } from 'src/app/model/product.model';

@Component({
  selector: '[product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product:ProductModel = {} as ProductModel
  reviewCount:number = 10;
  constructor(private cartService : CartService , private toastr: ToastrService) {

  }

  ngOnInit(): void {

  }

  clickBuy(item:ProductModel):void{
    const id =  AuthDetail.getLoginedInfo()?.id;

    this.cartService.addToCart(String(id), item, 1 );

    this.toastr.success("Add Cart suscess")


  }



}