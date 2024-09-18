import { createAction, props } from "@ngrx/store";
import { MemberModel } from "../model/member.model";
import { ResultModel } from "../model/result.model";
import { ProductModel } from "../model/product.model";
import { ProductResponseModel, ProductRewiewResponseModel } from "../model/product-response.model";

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



// save rewiew
export const saveProductRewiewAction = createAction(
  "[PRODUCT] saveProductRewiew",
  props<{ params: any }>()
);

export const saveProductRewiewActionSuscess = createAction(
    "[PRODUCT] saveProductRewiew suscess",
    props<{ result: ResultModel}>()
);

export const saveProductRewiewActionFail = createAction(
    "[PRODUCT] saveProductRewiew fail",
    props<{ msg: any }>()
);

// load rewiews
export const getRewiewsAction = createAction(
  "[PRODUCT] rewiews search",
  props<{ params: any }>()
);

export const getRewiewsActionSuscess = createAction(
    "[PRODUCT] rewiews search suscess",
    props<{ items: ProductRewiewResponseModel}>()
);

export const getRewiewsActionFail = createAction(
    "[PRODUCT] rewiews search fail",
    props<{ msg: any }>()
);
