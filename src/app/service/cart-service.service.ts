import { Injectable } from '@angular/core';

interface Cart {
  id: string;
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

  addToCart(id: string, productId: string, quantity: number): void {
    let cart = this.getCart();

    if (!cart) {
      cart = { id, items: {} };
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
