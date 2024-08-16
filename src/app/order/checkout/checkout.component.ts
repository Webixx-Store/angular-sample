import { Component, OnInit } from '@angular/core';
import { OrderRequestModel } from 'src/app/model/order-request.model';
import { TableConfig } from 'src/app/model/table-config';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  newProduct: string = '';
  promoCode:string='';

  config: TableConfig = {
    columns :[
       {header: "Product Name" , field : "productName"},
       {header: "Product ID" , field : "id"},
       {header: "Stock" , field : "stock"},
    ]

  }

  orderRequest: OrderRequestModel = {
    userId: '',
    items: [
      {
        productId: '',
        price: 0,
        quantity: 0
      }
    ],
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

  constructor() { }

  ngOnInit(): void {
  }

  isPopupOpen = false;

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onSumit():void{
    console.log(this.orderRequest)
  }

}
