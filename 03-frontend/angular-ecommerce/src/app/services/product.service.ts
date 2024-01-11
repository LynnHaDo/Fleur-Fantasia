import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    // Attributes
    private baseUrl = `${environment.fleurShopAPIUrl}/products`;
    private categoryUrl = `${environment.fleurShopAPIUrl}/product-category`;

    constructor(private httpClient: HttpClient) { }

    // Return the JSON data of a specific product from REST API
    getProduct(theProductId: number): Observable<Product>{
        const productUrl: string = `${this.baseUrl}/${theProductId}`;
        return this.httpClient.get<Product>(productUrl);
    }

    // Map the JSON data from REST API to Categories array 
    getProductCategories(): Observable<ProductCategory[]>{
        return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
            map(response => response._embedded.productCategory)
        )
    }

    // Map the JSON data from REST API to Products array
    getFullProductList(thePage: number, thePageSize: number): Observable<GetResponseProducts>{
        const url = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
        return this.httpClient.get<GetResponseProducts>(url);
    }

    // Map the JSON data from REST API products array in given size and page
    getProductListPagination(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts>{
        const paginateUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`
        return this.httpClient.get<GetResponseProducts>(paginateUrl);
    }

    // Map the JSON data from REST API to array of Products that match the keyword
    searchProducts(theKeyword: string): Observable<Product[]>{
        const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map(response => response._embedded.products)
        )
    }

    // Map the JSON data from REST API to array of Products within a given page that match the keyword
    searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts>{
        const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
        return this.httpClient.get<GetResponseProducts>(searchUrl);
    }
}

// Unwrap the JSON from Spring Data REST _embedded entry
interface GetResponseProducts{
    _embedded: {
        products: Product[];
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}

// Unwrap the JSON from Spring Data REST _embedded entry
interface GetResponseProductCategories{
    _embedded: {
        productCategory: ProductCategory[];
    }
}
