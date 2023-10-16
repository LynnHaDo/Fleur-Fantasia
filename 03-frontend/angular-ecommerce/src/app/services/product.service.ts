import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    // Attributes
    private baseUrl = 'http://localhost:8080/api/products';

    constructor(private httpClient: HttpClient) { }

    // Map the JSON data from REST API to Product array
    getProductList(): Observable<Product[]>{
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
            map(response => response._embedded.products)
        )
    }
}

// Unwrap the JSON from Spring Data REST _embedded entry
interface GetResponse{
    _embedded: {
        products: Product[];
    }
}
