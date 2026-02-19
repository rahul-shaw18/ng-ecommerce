import { CartItem } from './cart';

export type Order = {
  id: string;
  userId: number;
  total: number;
  items: CartItem[];
  paymentStatus: 'sucess' | 'failure';
};
