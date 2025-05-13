import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var PaystackPop: any;

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
})
export class CheckoutComponent {
  cartItems: any[] = [];
  totalAmount: number = 0;

  customer = {
    name: '',
    surname: '',
    email: '',
    address: '',
  };

  constructor(private cartService: CartService, private http: HttpClient) {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  payWithPaystack() {
    if (
      !this.customer.name ||
      !this.customer.surname ||
      !this.customer.email ||
      !this.customer.address
    ) {
      alert('Please fill in all details before proceeding to payment.');
      return;
    }

    const handler = PaystackPop.setup({
      key: 'pk_live_8fc14412adbbd8d6f9e73159fc6ddc4229c0755e', // ✅ Use your public key here
      email: this.customer.email,
      amount: this.totalAmount * 100, // Amount in kobo (R100 = 10000)
      currency: 'ZAR',
      ref: '' + Math.floor(Math.random() * 1000000000 + 1), // Unique reference
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: `${this.customer.name} ${this.customer.surname}`,
          },
          {
            display_name: 'Address',
            variable_name: 'customer_address',
            value: this.customer.address,
          },
        ],
      },
      callback: (response: any) => {
        alert(`Payment successful! Reference: ${response.reference}`);
        this.sendOrderDetails(response.reference);
        this.cartService.clearCart();
      },
      onClose: () => {
        alert('Payment window closed.');
      },
    });

    handler.openIframe();
  }

  sendOrderDetails(reference: string) {
    const orderDetails = {
      reference,
      customer: this.customer,
      items: this.cartItems,
      totalAmount: this.totalAmount,
    };

    this.http.post('http://localhost:3000/api/orders', orderDetails).subscribe(
      (response) => {
        console.log('Order sent successfully', response);
      },
      (error) => {
        console.error('Error sending order details', error);
      }
    );
  }
}
