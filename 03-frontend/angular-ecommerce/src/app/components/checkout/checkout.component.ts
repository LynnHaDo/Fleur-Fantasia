import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
    cartItems: CartItem[] = [];
    numItems: number = 0;
    subTotal: number = 0;
    shipping: number = 0;
    tax: number = 0;
    total: number = 0;

    startCheckout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    startPayment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    startDelivery: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private cartService: CartService,
                private checkoutService: CheckoutService){}

    ngOnInit(): void {
        this.displayOrderSummary();
        this.startCheckout = this.checkoutService.startCheckout;
        this.startDelivery = this.checkoutService.startDelivery;
        this.startPayment = this.checkoutService.startPayment;
    }

    displayOrderSummary(){
        this.cartItems = this.cartService.cartItems;
        this.cartService.totalPrice.subscribe(data => this.subTotal =  Math.round(data * 100) / 100);
        this.cartService.totalQuantity.subscribe(data => this.numItems = data);
        this.cartService.shippingPrice.subscribe(data => this.shipping = data);
        this.cartService.taxPrice.subscribe(data => this.tax = Math.round(data * 100) / 100);
        this.cartService.grandPrice.subscribe(data => this.total = Math.round(data * 100) / 100);
        this.cartService.calculateCartTotal();
    }

    
}
