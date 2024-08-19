export interface OrderRequestModel {
  id?: string;
  userId: string;
  items: OrderItemModel[];
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethodId: string;
  paymentMethod: PaymentMethodModel;
}


export interface OrderItemModel {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface PaymentMethodModel {
  provider: string;
  cardNumber?: string;
  expiryDate?: string;
  bankName?: string;
  accountNumber?: string;
  swiftCode?: string;
  billingAddress: string;
  createdAt: string;
}
