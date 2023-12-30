import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    // Attributes
    private baseUrl = 'http://localhost:8080/api/products';
    private categoryUrl = 'http://localhost:8080/api/product-category';

    constructor(private httpClient: HttpClient) { }

    // Map the JSON data from REST API to Product array
    getProductList(theCategoryId: number): Observable<Product[]>{
        // If the user selects no category, return all products
        if (theCategoryId == 0){
            return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
                map(response => response._embedded.products)
            )
        }
        // Otherwise, just look into the products of a specific category
        const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map(response => response._embedded.products)
        )
    }

    getProductCategories(): Observable<ProductCategory[]>{
        return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
            map(response => response._embedded.productCategory)
        )
    }

    searchProducts(theKeyword: string): Observable<Product[]>{
        const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map(response => response._embedded.products)
        )
    }
}

// Unwrap the JSON from Spring Data REST _embedded entry
interface GetResponseProducts{
    _embedded: {
        products: Product[];
    }
}

// Unwrap the JSON from Spring Data REST _embedded entry
interface GetResponseProductCategories{
    _embedded: {
        productCategory: ProductCategory[];
    }
}
