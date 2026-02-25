import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { EcommerceStore } from './ecommerce-store';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:category',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const store = inject(EcommerceStore);
      const categories = store.categories();
      return categories.map((cat) => ({ category: cat }));
    },
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Client,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },

  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },

  {
    path: 'order-success',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
