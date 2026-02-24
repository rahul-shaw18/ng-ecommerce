import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewPanel } from '../../../directives/view-panel';
import { ViewReviewItems } from '../view-review-items/view-review-items';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../../ecommerce-store';
import { WriteReview } from '../write-review/write-review';

@Component({
  selector: 'app-view-reviews',
  imports: [RatingSummary, ViewPanel, ViewReviewItems, MatButton, WriteReview],
  templateUrl: './view-reviews.html',
  styles: ``,
  host: { class: 'block' },
})
export class ViewReviews {
  store = inject(EcommerceStore);
  product = input.required<Product>();

  sortedReviews = computed(() => [
    ...this.product().reviews.sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime()),
  ]);
}
