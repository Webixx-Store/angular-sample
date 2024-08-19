import { Injectable } from '@angular/core';
import { OrderItemModel } from '../model/order-request.model';
import { ProductModel } from '../model/product.model';

interface Cart {
  id: string;
  items: { [productId: string]: { quantity: number, price: number , name:string } }; // Map<ProductId, {quantity, price}>
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private getCartKey(cartId: string): string {
    return `cart_${cartId}`;
  }

  constructor() { }

  getCart(cartId: string): OrderItemModel[] {
    const cartJson = localStorage.getItem(this.getCartKey(cartId));

    if (!cartJson) {
      return [];
    }

    const cart: Cart = JSON.parse(cartJson);
    const orderItems: OrderItemModel[] = [];

    for (const productId in cart.items) {
      if (cart.items.hasOwnProperty(productId)) {
        const { quantity, price , name  } = cart.items[productId];
        orderItems.push({ productId, quantity, price , name});
      }
    }

    return orderItems;
  }

  private getFullCart(cartId: string): Cart | null {
    const cartJson = localStorage.getItem(this.getCartKey(cartId));
    return cartJson ? JSON.parse(cartJson) : null;
  }

  saveCart(cart: Cart): void {
    localStorage.setItem(this.getCartKey(cart.id), JSON.stringify(cart));
  }

  addToCart(cartId: string, temp:ProductModel , quantity:number): void {
    let cart = this.getFullCart(cartId);

    if (!cart) {
      cart = { id: cartId, items: {} };
    }

    if (!cart.items[temp.id]) {
      const price = temp.price
      cart.items[temp.id] = { quantity: 0, price , name:temp.name };
    }

    // Update quantity and ensure price is consistent
    cart.items[temp.id].quantity += quantity;
    cart.items[temp.id].price = temp.price;  // Update to the latest price

    this.saveCart(cart);
  }

  removeProductFromCart(cartId: string, productId: string): void {
    let cart = this.getFullCart(cartId);

    if (cart) {
      delete cart.items[productId];
      if (Object.keys(cart.items).length === 0) {
        localStorage.removeItem(this.getCartKey(cartId));
      } else {
        this.saveCart(cart);
      }
    }
  }
}
