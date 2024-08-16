import { Injectable } from '@angular/core';

interface Cart {
  userId: string;
  items: { [productId: string]: number }; // Map<ProductId, Quantity>
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart';

  constructor() { }

  getCart(): Cart | null {
    const cartJson = localStorage.getItem(this.cartKey);
    return cartJson ? JSON.parse(cartJson) : null;
  }

  saveCart(cart: Cart): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(userId: string, productId: string, quantity: number): void {
    let cart = this.getCart();

    if (!cart) {
      cart = { userId, items: {} };
    }

    if (!cart.items[productId]) {
      cart.items[productId] = 0;
    }

    cart.items[productId] += quantity;
    this.saveCart(cart);
  }

  removeProductFromCart(productId: string): void {
    let cart = this.getCart();

    if (cart) {
      delete cart.items[productId];
      if (Object.keys(cart.items).length === 0) {
        localStorage.removeItem(this.cartKey);
      } else {
        this.saveCart(cart);
      }
    }
  }
}
