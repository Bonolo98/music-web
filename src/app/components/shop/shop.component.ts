import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
})
export class ShopComponent {

  products = [
    {
      id: 1,
      name: 'Beanie',
      description: 'Comfy and stylish winter beanie',
      delivery: 'Delivery Incl.',
      price: 160,
      images: {
        Black:
          'https://burnt.co.za/cdn/shop/files/Burnt-Studios-Activewear-Sienna-Collection-Moscow-Beanie-Black-Full.jpg?v=1683810218',
        White: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDw8NDw8PDQ8PDxAPDQ8PDw8NDQ0NFRUWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0ODw0NDysZFRkrKystKysrLSsrLSsrNysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMkA+wMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQIDBAUH/8QALxABAAIAAwUHBAIDAQAAAAAAAAERAgMSBDFRcZEhIjJBgaGxE1Jh0cHwFHLhYv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/cQAAAAAAAAcc3aIw9m+eEA7MY83Dh3zEfLxY8/Fi86jhDEYU0enFtkeUTPs5zteLhEOdFJo1/k4+MdIMO0Y4m7vjHYkQ1hg0dP8z/z7t4drw+dxzhwmITQuj24c3DO7FHVt82cpIjFG6ZjlJo+mPBg2nHG/vc97vl7Xhnsnuz+d3VR6AAAAAAAAAAAAAAAACZHj2nOudMbo3/mQTP2iZ7MPZHHzlxjCsQrIAChQAGoSQamUtmQG4xLqc7NQNyziwpqWwXKzpw7u2OD3ZeZGKLj/ALDwTBlY5wzcescYWVH0hMOKJi43SqgAAAAAAAAAAADjtOZUVG+eyHjiHTOx6sU8I7IYZoAliqliWCiWAqYhJ3CCIAqWIotrEskA3ErLKxKDts2bpmp3T7S9z5eJ7NkzbjTO+PeFg9ACgAAAAAAAAxnYqwzP4923n2zFuj1B5ogRmWVWZSxBFtLQBbLQBVZIlRICUBQAAgBRFQW1wYpiYmPJhbB9TLxxiiJjzaePYcfbOH1h7GgAAAAAAAAeHOxXimfSPR7Zl4Uo5yjcwlIrA3pSgZopqihGUpukoGUbopRiRvT/AHqaQYGqKQZVaWgZoWigShUkHbZJ78evw+g+bs89/DzfSWAAoAAAAAA5bTirDz7Hlh32ryjm5QzRKSmgVmkblKBmimigZpKbKBmimgGaSm6KBjSkw3RQMUU0AzSU0gJSUpIGX4sP+0fL6b5d7pfUWIAKAAAAAAPNtc9scpefU6bXj7Yrt7PJ5pnF9ssjtqJxOGqeE9E+pPCekivTqTU8/wBUjOgHptbeX6vNfq8wemy3mjN/E9JX6k8J6A9Fmp5vqT9s9DXi+2QenUmp59WL7ZLxfb8A76k1OPf+33hO/wAPeAdtROJx7/D3hJ18PeAdrS3G8X2yap4T0B2sty1zwnoap4T0B0l9PLnuxP4h8nVPCej6ez5kThwxcXpi484WI6gKAAAADGd4ZbYzvDIPNELSFsq1pNMM6iwXTCaIRQNEGmFATTBUKgKIWCiWAqFgBQAlJpUsGdJTTIJTezx349fhmW9l8XpP8CPYA0AAAADGd4Z9PltjO8Mg8yU0jKoKgKIAqAAIoIKAAgKCAtiAKIAIoCOmyeKeX6c3TZPFPL9ER6wGgAAAAYzvDLbGd4Z9AecBlURUAAAoAAABAAAAAAAAEUARQR02TxTy/TnLpsninl+iI9YDQAAAAMZ3hn0bYzd0+gOCSrMsqgoCIpIIABBAAqAAAACAKgAKgH9+AAJdNk8U8nOXTZPFPL+SI9YDQAAAAMZ09jbOPDcA86U6aJ4GmeEsq50U6aJ4fCaZ4SDFEw3pnhPQqeE9Ac6KbqeE9JT+7gYopqywZoppLBKKaQEopbLBKSlssEoWywShbAZl02TxTyYl12XBNzPlu5kR6QGgAAAAAAAAAAAAAAABKjgaY4QoCaY4R0NMcI6KAmmOEdDTHCFASilAAAAAAAAAAAf/2Q==',
        Grey: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      } as { [key: string]: string },
      colors: ['Black', 'White', 'Grey'],
      selectedColor: 'Black',
    },
  ];


  constructor(private cartService: CartService, private router: Router) { }

  addToCart(product: any) {

    const productWithColor = {
      ...product,
      color: product.selectedColor,
      image: product.images[product.selectedColor],
    };

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
