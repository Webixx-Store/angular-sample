import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isPopupOpen = true;
  constructor(private route: ActivatedRoute) { }
  productId:string = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = String(params.get('product'));
      alert(this.productId); // Log để kiểm tra giá trị lấy được
    });
  }

  closePopup():void{
    this.isPopupOpen = false;
  }

}
