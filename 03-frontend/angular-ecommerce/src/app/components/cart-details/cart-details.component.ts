import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {
    cartItems: CartItem[] = [];
    numItems: number = 0;
    subTotal: number = 0;
    shipping: number = 0;
    tax: number = 0;
    total: number = 0;

    ngOnInit(): void{
        this.displayCart();
    }

    constructor(private cartService: CartService){}

    displayCart(){
        this.cartItems = this.cartService.cartItems;
        this.cartService.totalPrice.subscribe(data => this.subTotal =  Math.round(data * 100) / 100);
        this.cartService.totalQuantity.subscribe(data => this.numItems = data);
        this.cartService.shippingPrice.subscribe(data => this.shipping = data);
        this.cartService.taxPrice.subscribe(data => this.tax = Math.round(data * 100) / 100);
        this.cartService.grandPrice.subscribe(data => this.total = Math.round(data * 100) / 100);
        this.cartService.calculateCartTotal();
    }

    decrementQuantity(theItem: CartItem){
        if (theItem.quantity > 1){
            theItem.quantity--;
            this.displayCart();
        } 
        else if (theItem.quantity == 1){
            this.removeItem(theItem);
        }
      }
    
    incrementQuantity(theItem: CartItem){
        theItem.quantity++;
        this.displayCart();
    }

    removeItem(theItem: CartItem){
        let indexToRemove: number = -1;
        let counter: number = 0;
        for (let item of this.cartItems){
            if (item.id === theItem.id){
                indexToRemove = counter;
                break;
            }
            counter++;
        }
        if (indexToRemove > -1){
            this.cartService.cartItems.splice(indexToRemove, 1);
            this.displayCart();
        }
    }
}
