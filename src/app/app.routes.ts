import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products/all',
    pathMatch: 'full',
  },
  {
    path: 'products/:category',
    title: 'Products',
    loadComponent: () => import('./pages/products-grid/products-grid'),
  },
  {
    path: 'wishlist',
    title: 'Wishlists',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
  },
  {
    path: 'cart',
    title: 'Cart',
    loadComponent: () => import('./pages/view-cart/view-cart'),
  },

  {
    path: 'checkout',
    title: 'Checkout',
    loadComponent: () => import('./pages/checkout/checkout'),
  },

  {
    path: 'order-success',
    title: 'Order Success',
    loadComponent: () => import('./pages/order-success/order-success'),
  },
];
