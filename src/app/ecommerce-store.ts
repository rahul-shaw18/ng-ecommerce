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
  selectedProductId: string | undefined;
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
        reviews: [
          {
            id: 'R001',
            productId: 'P001',
            userName: 'Arjun Mehta',
            userImageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
            rating: 5,
            title: 'Outstanding Noise Cancellation!',
            comment:
              'The active noise cancellation works brilliantly. I use it during flights and it blocks almost all background noise. Battery easily lasts more than 25 hours.',
            reviewDate: new Date('2026-01-10'),
          },
          {
            id: 'R002',
            productId: 'P001',
            userName: 'Sneha Kapoor',
            userImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
            rating: 4,
            title: 'Great Sound, Slightly Bulky',
            comment:
              "Sound quality is crisp with deep bass. The only downside is it's slightly bulky for daily commute, but comfort is excellent.",
            reviewDate: new Date('2026-01-18'),
          },
          {
            id: 'R003',
            productId: 'P001',
            userName: 'Rahul Verma',
            userImageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
            rating: 5,
            title: 'Worth Every Penny',
            comment:
              'Premium build quality and amazing clarity. The 30-hour battery life is accurate. Totally satisfied with this purchase.',
            reviewDate: new Date('2026-02-02'),
          },
        ],
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
        reviews: [
          {
            id: 'R004',
            productId: 'P002',
            userName: 'Priya Nair',
            userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
            rating: 4,
            title: 'Perfect Workout Companion',
            comment:
              'Tracks my heart rate and sleep accurately. The AMOLED display is bright and easy to read outdoors.',
            reviewDate: new Date('2026-01-08'),
          },
          {
            id: 'R005',
            productId: 'P002',
            userName: 'Karan Malhotra',
            userImageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
            rating: 5,
            title: 'Feature Packed!',
            comment:
              'Water resistance works great during swimming. Step tracking and workout modes are very helpful.',
            reviewDate: new Date('2026-01-20'),
          },
          {
            id: 'R006',
            productId: 'P002',
            userName: 'Anita Deshmukh',
            userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
            rating: 3,
            title: 'Good but Battery Could Improve',
            comment:
              'Overall performance is good but battery drains faster when using continuous heart rate monitoring.',
            reviewDate: new Date('2026-02-05'),
          },
        ],
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
        reviews: [
          {
            id: 'R007',
            productId: 'P003',
            userName: 'Vikram Singh',
            userImageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
            rating: 5,
            title: 'Slim and Stylish',
            comment:
              'The leather quality feels premium and the RFID blocking gives extra security. Fits perfectly in pocket.',
            reviewDate: new Date('2026-01-12'),
          },
          {
            id: 'R008',
            productId: 'P003',
            userName: 'Neha Sharma',
            userImageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
            rating: 4,
            title: 'Great Value for Money',
            comment:
              'Compact design yet holds enough cards and cash. Stitching is neat and durable.',
            reviewDate: new Date('2026-01-25'),
          },
          {
            id: 'R009',
            productId: 'P003',
            userName: 'Amit Joshi',
            userImageUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
            rating: 4,
            title: 'Very Practical',
            comment:
              'Simple, elegant, and lightweight. Would recommend for anyone looking for a minimalist wallet.',
            reviewDate: new Date('2026-02-01'),
          },
        ],
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
        reviews: [
          {
            id: 'R010',
            productId: 'P004',
            userName: 'Rohan Gupta',
            userImageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
            rating: 5,
            title: 'Gamers Will Love This!',
            comment:
              'The blue switches feel amazing and tactile. RGB lighting customization is fantastic.',
            reviewDate: new Date('2026-01-14'),
          },
          {
            id: 'R011',
            productId: 'P004',
            userName: 'Ishita Roy',
            userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
            rating: 4,
            title: 'Solid Build Quality',
            comment:
              'Feels sturdy and premium. Keys are responsive, though slightly loud due to blue switches.',
            reviewDate: new Date('2026-01-29'),
          },
          {
            id: 'R012',
            productId: 'P004',
            userName: 'Aditya Kulkarni',
            userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
            rating: 5,
            title: 'Best Keyboard in This Range',
            comment: 'Perfect for both gaming and typing. RGB effects look stunning at night.',
            reviewDate: new Date('2026-02-06'),
          },
        ],
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
        reviews: [
          {
            id: 'R013',
            productId: 'P005',
            userName: 'Manish Arora',
            userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
            rating: 5,
            title: 'Super Comfortable',
            comment: 'Very lightweight and breathable. Great cushioning for long-distance runs.',
            reviewDate: new Date('2026-01-09'),
          },
          {
            id: 'R014',
            productId: 'P005',
            userName: 'Pooja Bansal',
            userImageUrl: 'https://randomuser.me/api/portraits/women/24.jpg',
            rating: 4,
            title: 'Perfect Fit',
            comment: 'Fits perfectly and provides excellent grip. Stylish design as well.',
            reviewDate: new Date('2026-01-30'),
          },
          {
            id: 'R015',
            productId: 'P005',
            userName: 'Sahil Khan',
            userImageUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
            rating: 3,
            title: 'Good but Wears Out Fast',
            comment:
              'Comfort is good, but after 4 months of daily running, the sole started wearing out.',
            reviewDate: new Date('2026-02-07'),
          },
        ],
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
        reviews: [
          {
            id: 'R016',
            productId: 'P006',
            userName: 'Tanvi Shah',
            userImageUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
            rating: 4,
            title: 'Great for Trips',
            comment: 'Compact and easy to carry. Sound is clear and bass is decent for its size.',
            reviewDate: new Date('2026-01-15'),
          },
          {
            id: 'R017',
            productId: 'P006',
            userName: 'Nikhil Rao',
            userImageUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
            rating: 5,
            title: 'Impressive Bass',
            comment:
              'For a portable speaker, the bass is surprisingly deep. Battery backup is accurate.',
            reviewDate: new Date('2026-01-22'),
          },
          {
            id: 'R018',
            productId: 'P006',
            userName: 'Meera Iyer',
            userImageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
            rating: 4,
            title: 'Value for Money',
            comment: 'Waterproof feature is handy for pool parties. Sound quality is solid.',
            reviewDate: new Date('2026-02-04'),
          },
        ],
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
        reviews: [
          {
            id: 'R019',
            productId: 'P007',
            userName: 'Deepak Menon',
            userImageUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
            rating: 5,
            title: 'Back Pain Relief!',
            comment:
              'Lumbar support is excellent. I can work 8–9 hours comfortably without back pain.',
            reviewDate: new Date('2026-01-11'),
          },
          {
            id: 'R020',
            productId: 'P007',
            userName: 'Shreya Pillai',
            userImageUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
            rating: 4,
            title: 'Very Comfortable',
            comment: 'Mesh back keeps it breathable. Easy to assemble and adjust.',
            reviewDate: new Date('2026-01-27'),
          },
          {
            id: 'R021',
            productId: 'P007',
            userName: 'Harsh Vardhan',
            userImageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
            rating: 5,
            title: 'Great Investment',
            comment: 'Premium feel and strong build quality. Worth the price.',
            reviewDate: new Date('2026-02-03'),
          },
        ],
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
        reviews: [
          {
            id: 'R022',
            productId: 'P008',
            userName: 'Ritika Sinha',
            userImageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
            rating: 4,
            title: 'Keeps Water Cold All Day',
            comment: 'Keeps my water cold for almost 24 hours as promised. Leak-proof and sturdy.',
            reviewDate: new Date('2026-01-13'),
          },
          {
            id: 'R023',
            productId: 'P008',
            userName: 'Mohit Jain',
            userImageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
            rating: 5,
            title: 'Excellent Quality',
            comment: 'Very durable and stylish design. Perfect for gym and office use.',
            reviewDate: new Date('2026-01-26'),
          },
          {
            id: 'R024',
            productId: 'P008',
            userName: 'Kavya Reddy',
            userImageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
            rating: 4,
            title: 'Good Insulation',
            comment: 'Keeps coffee hot for hours. Slightly heavy but understandable for steel.',
            reviewDate: new Date('2026-02-08'),
          },
        ],
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
        reviews: [
          {
            id: 'R025',
            productId: 'P009',
            userName: 'Aravind Krishnan',
            userImageUrl: 'https://randomuser.me/api/portraits/men/35.jpg',
            rating: 5,
            title: 'Perfect for Photographers',
            comment:
              'Plenty of padded compartments and very secure. Comfortable straps for travel.',
            reviewDate: new Date('2026-01-16'),
          },
          {
            id: 'R026',
            productId: 'P009',
            userName: 'Divya Agarwal',
            userImageUrl: 'https://randomuser.me/api/portraits/women/36.jpg',
            rating: 4,
            title: 'Spacious and Durable',
            comment: 'Water-resistant material works well in light rain. Fits all my gear easily.',
            reviewDate: new Date('2026-01-31'),
          },
          {
            id: 'R027',
            productId: 'P009',
            userName: 'Ritesh Sharma',
            userImageUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
            rating: 4,
            title: 'Good Protection',
            comment:
              'Protects camera equipment well. Could use a bit more small accessory pockets.',
            reviewDate: new Date('2026-02-09'),
          },
        ],
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
        reviews: [
          {
            id: 'R028',
            productId: 'P010',
            userName: 'Ankur Bhatt',
            userImageUrl: 'https://randomuser.me/api/portraits/men/38.jpg',
            rating: 5,
            title: 'Crystal Clear Display',
            comment:
              'The 4K resolution is stunning. Colors are vibrant and HDR makes a big difference.',
            reviewDate: new Date('2026-01-17'),
          },
          {
            id: 'R029',
            productId: 'P010',
            userName: 'Sonal Mehra',
            userImageUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
            rating: 5,
            title: 'Best Monitor for Productivity',
            comment: 'Ultra-thin bezels and sharp display make multitasking effortless.',
            reviewDate: new Date('2026-02-01'),
          },
          {
            id: 'R030',
            productId: 'P010',
            userName: 'Gaurav Sethi',
            userImageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
            rating: 4,
            title: 'Excellent but Expensive',
            comment:
              'Performance is top-notch for gaming and editing. Slightly pricey but worth it.',
            reviewDate: new Date('2026-02-10'),
          },
        ],
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
  } as EcommerceStore),

  // withStorageSync({
  //   key: 'modern-store',
  //   select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  // }),

  withComputed(({ products, category, cartItems, selectedProductId }) => ({
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

    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category) => {
        patchState(store, { category });
      }),

      setProductId: signalMethod<string>((productId) => {
        patchState(store, { selectedProductId: productId });
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
