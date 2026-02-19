import { CartItem } from './models/cart';
import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Toaster } from './services/toaster';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';

import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceStore = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    products: [
      {
        id: 'P001',
        name: 'Wireless Noise Cancelling Headphones',
        description:
          'Premium over-ear headphones with active noise cancellation and 30 hours battery life.',
        price: 12999,
        imageUrl:
          'https://images.unsplash.com/photo-1765279360461-e6b8199b906c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.5,
        reviewCount: 342,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 'P002',
        name: 'Smart Fitness Watch',
        description:
          'Track heart rate, steps, sleep, and workouts with AMOLED display and water resistance.',
        price: 8999,
        imageUrl:
          'https://images.unsplash.com/photo-1669480380743-f76990b9bc44?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.2,
        reviewCount: 210,
        inStock: true,
        category: 'Wearables',
      },
      {
        id: 'P003',
        name: 'Minimalist Leather Wallet',
        description: 'Genuine leather wallet with RFID blocking and slim design.',
        price: 1499,
        imageUrl:
          'https://images.unsplash.com/photo-1620109433753-a62f2c961b69?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.3,
        reviewCount: 120,
        inStock: true,
        category: 'Accessories',
      },
      {
        id: 'P004',
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB mechanical keyboard with blue switches and customizable lighting.',
        price: 5499,
        imageUrl:
          'https://images.unsplash.com/photo-1703482771739-caef1f39797e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.6,
        reviewCount: 480,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 'P005',
        name: 'Running Sports Shoes',
        description: 'Lightweight breathable running shoes designed for long-distance comfort.',
        price: 3999,
        imageUrl:
          'https://images.unsplash.com/photo-1619253341026-74c609e6ce50?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.4,
        reviewCount: 275,
        inStock: false,
        category: 'Footwear',
      },
      {
        id: 'P006',
        name: 'Bluetooth Portable Speaker',
        description: 'Compact speaker with deep bass, waterproof design, and 12 hours playback.',
        price: 2499,
        imageUrl:
          'https://images.unsplash.com/photo-1598034989845-48532781987e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.1,
        reviewCount: 165,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 'P007',
        name: 'Ergonomic Office Chair',
        description: 'Adjustable lumbar support chair with breathable mesh and 360° swivel.',
        price: 10999,
        imageUrl:
          'https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.5,
        reviewCount: 198,
        inStock: true,
        category: 'Furniture',
      },
      {
        id: 'P008',
        name: 'Stainless Steel Water Bottle',
        description:
          'Insulated water bottle that keeps drinks cold for 24 hours and hot for 12 hours.',
        price: 899,
        imageUrl:
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.3,
        reviewCount: 90,
        inStock: true,
        category: 'Lifestyle',
      },
      {
        id: 'P009',
        name: 'DSLR Camera Backpack',
        description: 'Water-resistant camera backpack with padded compartments for gear safety.',
        price: 3499,
        imageUrl:
          'https://images.unsplash.com/photo-1521134563007-647ff6127244?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.4,
        reviewCount: 134,
        inStock: true,
        category: 'Bags',
      },
      {
        id: 'P010',
        name: '4K Ultra HD Monitor',
        description: '27-inch 4K UHD monitor with HDR support and ultra-thin bezels.',
        price: 27999,
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1669380425564-6e1a281a4d30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.7,
        reviewCount: 256,
        inStock: true,
        category: 'Electronics',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  } as EcommerceStore),

  // withStorageSync({
  //   key: 'modern-store',
  //   select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  // }),

  withComputed(({ products, category, cartItems }) => ({
    filteredProducts: computed(() => {
      return category().toLowerCase() === 'all'
        ? products()
        : products().filter((p) => p.category?.toLowerCase() === category().toLowerCase());
    }),

    categories: computed(() => {
      const cats = new Set(products().map((p) => p.category.toLowerCase()));
      return ['all', ...cats];
    }),

    cartItemCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category) => {
        patchState(store, { category });
      }),

      addToWishlists: signalMethod<Product>((product) => {
        patchState(store, { wishlistItems: [...store.wishlistItems(), product] });
        toaster.success(`${product.name} added to wishlist!`);
      }),

      removeFromWishlists: signalMethod<Product>((product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success(`${product.name} removed from wishlist!`);
      }),

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      addToCart(product: Product, quantity: number = 1) {
        const existingItem = store.cartItems().find((item) => item.product.id === product.id);
        if (existingItem) {
          patchState(store, {
            cartItems: store
              .cartItems()
              .map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
          });
        } else {
          patchState(store, { cartItems: [...store.cartItems(), { product, quantity }] });
        }
        toaster.success(
          existingItem
            ? `Updated ${product.name} quantity in cart!`
            : `Added ${product.name} to cart!`,
        );
      },

      setItemQuantity(params: { productId: string; quantity: number }) {
        const { productId, quantity } = params;
        patchState(store, {
          cartItems: store
            .cartItems()
            .map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
        });
        const product = store.products().find((p) => p.id === productId);
        if (product) {
          toaster.success(`Updated ${product.name} quantity in cart!`);
        }
      },

      addAllWishListToCart() {
        store.wishlistItems().forEach((product) => {
          this.addToCart(product);
        });
        patchState(store, { wishlistItems: [] });
        toaster.success(`All wishlist items added to cart!`);
      },
      removeFromCart(product: Product) {
        patchState(store, {
          cartItems: store.cartItems().filter((item) => item.product.id !== product.id),
        });
        toaster.success(`${product.name} removed from cart!`);
      },
      moveToWishlist(product: Product) {
        this.removeFromCart(product);
        this.addToWishlists(product);
      },

      proceedToCheckout() {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      async placeOrder() {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order.');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: `ORD-${Date.now()}`,
          userId: user.id,
          total: Math.round(
            store
              .cartItems()
              .reduce((total, item) => total + item.product.price * item.quantity, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'sucess',
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['/order-success']);
        toaster.success('Your order has been placed successfully!');
      },

      signIn({ email, password, checkout, dialogId }: SignInParams) {
        patchState(store, {
          user: {
            id: 1,
            name: 'Admin User',
            email: email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }

        toaster.success(`Welcome back, ${store.user()?.name}!`);
      },

      signUp({ email, name, password, checkout, dialogId }: SignUpParams) {
        patchState(store, {
          user: {
            id: 1,
            name: name,
            email: email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }

        toaster.success(`Welcome back, ${store.user()?.name}!`);
      },

      signOut() {
        patchState(store, { user: undefined });
        toaster.success(`You have been signed out.`);
      },
    }),
  ),
);
