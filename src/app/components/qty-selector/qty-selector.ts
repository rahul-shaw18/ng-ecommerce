import { Component, input, output, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-qty-selector',
  imports: [MatIcon],
  templateUrl: './qty-selector.html',
  styles: ``,
})
export class QtySelector {
  quantity = input(0);

  qtyUpdated = output<number>();
}
