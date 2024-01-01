import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

import { Fancybox } from '@fancyapps/ui';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: [
    './product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.displayProduct();
    });

    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {});
  }

  ngOnDestroy(): void {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close;
  }

  displayProduct() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  decrementQuantity(quantity: number){
    if (quantity > 1){
        var num = new Number(quantity - 1);
        document.querySelector(".num")!.innerHTML = num.toString();
    } 
  }

  incrementQuantity(quantity: number){
    var num = new Number(quantity + 1);
    document.querySelector(".num")!.innerHTML = num.toString();
  }

  addToCart(){
    let theCartItem = new CartItem(this.product);
    let theQuantity = +document.querySelector(".num")!.innerHTML;
    theCartItem.quantity = theQuantity;
    this.cartService.addToCart(theCartItem, theQuantity);
  }
}
