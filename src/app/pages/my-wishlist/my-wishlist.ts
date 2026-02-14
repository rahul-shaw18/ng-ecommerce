import { Component, inject, OnInit } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from "../../components/product-card/product-card";
import { BackButton } from "../../components/back-button/back-button";
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatAnchor, MatButton } from '@angular/material/button';
import { EmptyWishlist } from "./empty-wishlist/empty-wishlist";


@Component({
  selector: 'app-my-wishlist',
  imports: [ProductCard, BackButton, MatIcon, MatIconButton, MatAnchor, MatButton, EmptyWishlist],
  templateUrl: './my-wishlist.html',
  styles: ``,
})
export default class MyWishlist {
    store = inject(EcommerceStore);

}
