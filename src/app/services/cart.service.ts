import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';

  constructor() {}

  getCart() {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(product: any) {
    let cart = this.getCart();
    const existingProduct = cart.find((item: any) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  removeFromCart(index: number) {
    let cart = this.getCart();
    cart.splice(index, 1);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  updateCartItem(index: number, item: any) {
    const cart = this.getCart();
    cart[index] = item;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
