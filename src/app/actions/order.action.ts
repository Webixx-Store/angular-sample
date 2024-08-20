import { createAction, props } from "@ngrx/store";
import { MemberModel } from "../model/member.model";
import { ResultModel } from "../model/result.model";
import { ProductModel } from "../model/product.model";
import { ProductResponseModel } from "../model/product-response.model";
import { OrderRequestModel } from "../model/order-request.model";

// load products
export const orderCheckoutAction = createAction(
  "[PRODUCT] order checkout",
  props<{ params: any }>()
);

export const orderCheckoutActionSuscess = createAction(
    "[PRODUCT] order checkout suscess",
    props<{ result: ResultModel}>()
);

export const orderCheckoutActionFail = createAction(
    "[PRODUCT] order checkout fail",
    props<{ msg: any }>()
);

