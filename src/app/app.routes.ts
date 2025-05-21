import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DiscographyComponent } from './components/discography/discography.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MusicComponent } from './components/music/music.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'discography', component: DiscographyComponent },
  { path: 'merch', component: ShopComponent },
  { path: 'music', component: MusicComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'gallery', component: GalleryComponent },
];
