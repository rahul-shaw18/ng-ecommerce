import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  templateUrl: './summarize-order.html',
  styles: ``,
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subTotal = computed(() =>
    Math.round(
      this.store.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0),
    ),
  );

  tax = computed(() => Math.round(this.subTotal() * 0.05)); // Assuming 5% tax

  total = computed(() => Math.round(this.subTotal() + this.tax()));
}
