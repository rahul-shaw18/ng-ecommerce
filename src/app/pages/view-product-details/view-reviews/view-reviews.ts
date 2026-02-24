import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/product';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewPanel } from '../../../directives/view-panel';
import { ViewReviewItems } from '../view-review-items/view-review-items';

@Component({
  selector: 'app-view-reviews',
  imports: [RatingSummary, ViewPanel, ViewReviewItems],
  templateUrl: './view-reviews.html',
  styles: ``,
})
export class ViewReviews {
  product = input.required<Product>();

  sortedReviews = computed(() => [...this.product().reviews.sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime())]);
}
