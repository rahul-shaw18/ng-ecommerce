import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionItem } from '../../../models/option-item';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../../ecommerce-store';
import { AddReviewParams } from '../../../models/user-reviews';

@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './write-review.html',
  styles: ``,
})
export class WriteReview {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  ratingOptions = signal<OptionItem[]>([
    {
      label: '1 Star - Terrible',
      value: 1,
    },
    {
      label: '2 Stars - Poor',
      value: 2,
    },
    {
      label: '3 Stars - Average',
      value: 3,
    },
    {
      label: '4 Stars - Good',
      value: 4,
    },
    {
      label: '5 Stars - Excellent',
      value: 5,
    },
  ]);

  reviewForm = this.fb.group({
    rating: [5, Validators.required],
    title: ['', Validators.required],
    comment: ['', Validators.required],
  });

  saveReview() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const { rating, title, comment } = this.reviewForm.value;
    this.store.addReview({
      rating,
      title,
      comment,
    } as AddReviewParams);
  }
}
