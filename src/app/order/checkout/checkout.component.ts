import { ParsedProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { setShowOverlayLoading } from 'src/app/actions/overlay-loading.action';
import { productAction } from 'src/app/actions/product.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { OrderRequestModel } from 'src/app/model/order-request.model';
import { ProductResponseModel } from 'src/app/model/product-response.model';
import { ProductModel } from 'src/app/model/product.model';
import { TableConfig } from 'src/app/model/table-config';
import { getProducts, ProductState } from 'src/app/selectors/product.selector';
import { CartService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  newProduct: string = '';
  promoCode: string = '';

  page = 0;
  len = 5;
  total = 0;
  promotionCode = -5;

  items$ = new Observable<ProductResponseModel>();
  items: ProductModel[] = [];


  config: TableConfig = {
    columns: [
      { header: "Product Name", field: "name" },
      { header: "Price", field: "price" },
      { header: "Rate Sale", field: "rateShow" },
      { header: "Price Sale", field: "priceSaleShow" },
      { header: "Stock", field: "stock" },

    ]

  }




  orderRequest: OrderRequestModel = {
    userId: '',
    items: [],

    totalAmount: 0,
    status: 'PENDING',
    shippingAddress: '',
    paymentMethodId: '',
    paymentMethod: {
      provider: '',
      cardNumber: '',
      expiryDate: '',
      bankName: '',
      accountNumber: '',
      swiftCode: '',
      billingAddress: '',
      createdAt: new Date().toISOString() // Initial date value
    }
  };


  constructor(private cartService : CartService, private productStore: Store<ProductState> , private toastr: ToastrService) {
    this.items$ = this.productStore.select(getProducts);
    this.loadCart();
  }

  ngOnInit(): void {
    this.loadProduct();
    this.items$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res.products;
        this.total = res.totalCount;

        this.items = this.items.map(item => ({
          ...item,
          rateShow: String((item.rate * 100).toFixed(2) ) + "%"
          , priceSaleShow : String(  ((1-item.rate)*item.price).toFixed(2)     )  // Thực hiện phép tính và lưu vào đối tượng
        }));

      }
    })

  }

  isPopupOpen = false;

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onSumit(): void {

  }

  handlePageEvent(page: PageEvent) {
    this.page = page.pageIndex;
    this.len = page.pageSize;
    this.loadProduct();
  }

  loadProduct(): void {
    this.productStore.dispatch(productAction({
      params: {
        page: this.page,
        len: this.len,

      }
    }))


  }

  clickRow(item: any) {
    const id =  AuthDetail.getLoginedInfo()?.id;
    this.cartService.addToCart(String(id), item, 1 );
    this.loadCart();
    this.isPopupOpen = false;
    this.toastr.success("Add Cart suscess")

  }

  removeFromCart(productId: string): void {
    const id =  AuthDetail.getLoginedInfo()?.id;
    this.cartService.removeProductFromCart(String(id), productId);
    this.loadCart();

  }

  loadCart(){
    this.orderRequest.items = this.cartService.getCart(String(AuthDetail.getLoginedInfo()?.id))
    this.orderRequest.totalAmount  = 0;
    for (const item of this.orderRequest.items ){
      this.orderRequest.totalAmount  =this.orderRequest.totalAmount +  (item.price * item.quantity) ;
    }

    this.orderRequest.totalAmount  = this.orderRequest.totalAmount  + this.promotionCode
  }

}
