import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { MemberModel } from "../model/member.model";
import { Injectable } from "@angular/core";
import { ConvertUtil } from "../common/util/convert.util";
import { ValidationUtil } from "../common/util/validation.util";
import { ResultModel } from "../model/result.model";
import { AuthDetail } from "../common/util/auth-detail";
import { ProductModel } from "../model/product.model";
import { ProductResponseModel } from "../model/product-response.model";
@Injectable({
  providedIn: 'root'
})
export class ProductService{
    res:string = '';
    constructor(private _http: HttpClient) { }

  allProduct(params:any): Observable<ProductResponseModel> {
    let url = `${environment.apiUrl}/api/products`;
    const headers: HttpHeaders = AuthDetail.getHeaderJwt();
    const page = params.page;
    const len = params.len;
    if(ValidationUtil.isNotNullAndNotEmpty(params.id)){
      url = `${environment.apiUrl}/api/products/` + params.id;
    }
    // Add page and len as query parameters
    const queryParams = `?page=${page}&len=${len}`;
    return this._http.get<ProductResponseModel>(`${url}${queryParams}`, {
        headers: headers
    });
  }


  }




