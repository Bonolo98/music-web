import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterLink],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
})
export class ShopComponent {
  products = [
    {
      id: 1,
      name: 'BEANIE 1',
      description: 'Short description',
      price: 2,
      image:
        'https://burnt.co.za/cdn/shop/files/Burnt-Studios-Activewear-Sienna-Collection-Moscow-Beanie-Black-Full.jpg?v=1683810218',
    },
    {
      id: 2,
      name: 'BEANIE 2',
      description: 'Short description',
      price: 2,
      image:
        'https://burnt.co.za/cdn/shop/files/Burnt-Studios-Activewear-Sienna-Collection-Moscow-Beanie-Black-Full.jpg?v=1683810218',
    },
    {
      id: 3,
      name: 'BEANIE 3',
      description: 'Short description',
      price: 2,
      image:
        'https://burnt.co.za/cdn/shop/files/Burnt-Studios-Activewear-Sienna-Collection-Moscow-Beanie-Black-Full.jpg?v=1683810218',
    },
  ];

  constructor(private cartService: CartService, private router: Router) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.openModal();
  }

  toCart() {
    this.router.navigate(['/cart']);
  }

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
