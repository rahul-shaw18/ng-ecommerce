import { Component, inject } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { EcommerceStore } from '../../ecommerce-store';

import {MatBadge} from '@angular/material/badge';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge],
  templateUrl: './header-actions.html',
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);

}
