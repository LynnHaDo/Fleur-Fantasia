import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {
    totalPrice: number = 0;
    totalQuantity: number = 0;

    constructor(private cartService: CartService){}

    ngOnInit(): void{
        this.updateCartStatus();
    }

    // Methods
    updateCartStatus(){
        this.cartService.totalPrice.subscribe(data => {
            this.totalPrice = Math.round(data * 100) / 100;
        })

        this.cartService.totalQuantity.subscribe(data => {
            this.totalQuantity = data;
        })
    }

}
