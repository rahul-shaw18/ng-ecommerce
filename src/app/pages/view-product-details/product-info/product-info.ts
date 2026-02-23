import { Component, input, signal, inject } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { MatAnchor, MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../../ecommerce-store';
import { ToggleWishlistButton } from "../../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatus, QtySelector, MatIcon, ToggleWishlistButton, MatButton, MatIconButton],
  templateUrl: './product-info.html',
  styles: ``,
})
export class ProductInfo {
  product = input.required<Product>();

  quantity = signal(1);
  store = inject(EcommerceStore);
}
