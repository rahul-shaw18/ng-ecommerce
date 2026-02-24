import { Component, input } from '@angular/core';
import { UserReview } from '../../../models/user-reviews';
import { StarRating } from '../../../components/star-rating/star-rating';
import { DatePipe } from '@angular/common';
import { ViewPanel } from '../../../directives/view-panel';

@Component({
  selector: 'app-view-review-items',
  imports: [StarRating, DatePipe, ViewPanel],
  templateUrl: './view-review-items.html',
  styles: ``,
})
export class ViewReviewItems {
  review = input.required<UserReview>();
}
