import { createAction, props } from "@ngrx/store";
import { MemberModel } from "../model/member.model";
import { ResultModel } from "../model/result.model";
import { ProductModel } from "../model/product.model";
import { ProductResponseModel } from "../model/product-response.model";

// load products
export const productAction = createAction(
  "[PRODUCT] product search",
  props<{ params: any }>()
);

export const productActionSuscess = createAction(
    "[PRODUCT] product search suscess",
    props<{ items: ProductResponseModel}>()
);

export const productActionFail = createAction(
    "[PRODUCT] product search fail",
    props<{ msg: any }>()
);

