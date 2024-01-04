import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
    @Input() numItems: number = 0;
    @Input() subTotal: number = 0;
    @Input() shipping: number = 0;
    @Input() tax: number = 0;
    @Input() total: number = 0;

    constructor(){}
}
