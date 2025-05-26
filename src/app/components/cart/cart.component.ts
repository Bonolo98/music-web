// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from '../../services/cart.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-cart',
//   imports: [CommonModule],
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css'],
//   standalone: true,
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   totalAmount: number = 0;

//   constructor(private cartService: CartService, private router: Router) {}

//   ngOnInit() {
//     this.loadCart();
//   }

//   loadCart() {
//     this.cartItems = this.cartService.getCart();
//     this.totalAmount = this.cartItems.reduce(
//       (sum, item) => sum + item.quantity * item.price,
//       0
//     );
//   }

//   removeFromCart(index: number) {
//     this.cartService.removeFromCart(index);
//     this.loadCart();
//   }

//   clearCart() {
//     this.cartService.clearCart();
//     this.loadCart();
//   }

//   proceedToCheckout() {
//     this.router.navigate(['/checkout']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  incrementQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.cartService.updateCartItem(index, this.cartItems[index]);
    this.calculateTotal();
  }

  decrementQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.cartService.updateCartItem(index, this.cartItems[index]);
      this.calculateTotal();
    }
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
