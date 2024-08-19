import { ProductModel } from "./product.model";

export interface ProductResponseModel {
  products: ProductModel[]; // Array of ProductModel
  totalCount: number;       // Total number of products
}
