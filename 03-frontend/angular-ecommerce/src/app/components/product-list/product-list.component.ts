import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    products: Product[] = [];
    currentCategoryId: number = 1;
    previousCategoryId: number = 1;
    searchMode: boolean = false;

    // Pagination properties
    thePageNumber: number = 1;
    thePageSize: number = 9;
    theTotalElements: number = 0;
    
    previousKeyword: string = "";

    constructor(private productService: ProductService, 
                private cartService: CartService,
                private route: ActivatedRoute){ }

    ngOnInit() {
        this.route.paramMap.subscribe(() => {
            this.listProducts()
        })
    }

    updatePageSize(newPageSize: number){
        this.thePageSize = newPageSize;
        this.thePageNumber = 1;
        this.listProducts();
    }

    listProducts() {
        this.searchMode = this.route.snapshot.paramMap.has('keyword');

        if (this.searchMode){
            this.handleSearchProducts();
        } 
        else {
            this.handleListProducts();
        }
    }

    handleListProducts(){
        // check if "id" param is available
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId){
            this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // assert that this is non-null
        } else {
            this.productService.getFullProductList(this.thePageNumber - 1, this.thePageSize).subscribe(data => {
                this.products = data._embedded.products;
                this.thePageSize = data.page.size;
                this.theTotalElements = data.page.totalElements;
                this.thePageNumber = data.page.number + 1;
            })
            return;
        }

        // check if we have a different category than previous
        if (this.previousCategoryId != this.currentCategoryId){
            this.thePageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;

        this.productService .getProductListPagination(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
                            .subscribe(data => {
                                this.products = data._embedded.products;
                                this.thePageNumber = data.page.number + 1;
                                this.thePageSize = data.page.size;
                                this.theTotalElements = data.page.totalElements;
                            })
    }

    handleSearchProducts(){
        const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

        if (this.previousKeyword != theKeyword){
            this.thePageNumber = 1;
        }

        this.previousKeyword = theKeyword;

        this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(
            data => {
                this.products = data._embedded.products;
                this.thePageNumber = data.page.number + 1;
                this.thePageSize = data.page.size;
                this.theTotalElements = data.page.totalElements;
            }
        )
    }

    // Add an item to cart
    addToCart(theProduct: Product){
        const theCartItem = new CartItem(theProduct);

        this.cartService.addToCart(theCartItem, 1);
    }
}
