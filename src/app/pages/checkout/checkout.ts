import { Component, inject, signal } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from './shipping-form/shipping-form';
import { PaymentForm } from './payment-form/payment-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { EcommerceStore } from '../../ecommerce-store';
import { MatAnchor, MatButton } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, SummarizeOrder, MatAnchor, MatButton],
  templateUrl: './checkout.html',
  styles: ``,
})
export default class Checkout {
  store = inject(EcommerceStore);


  placeOrder() {
  }
}
