import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIcon ],
  templateUrl: './product-card.html',
  styles: ``,
})
export class ProductCard {
  store = inject(EcommerceStore);

  product = input.required<Product>();

}
