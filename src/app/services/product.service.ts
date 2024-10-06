import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assets/data/dataSports.json'; 

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<{productos: any[]}>(this.apiUrl).pipe(
      map(response => response.productos)
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<{productos: any[]}>(this.apiUrl).pipe(
      map(response => response.productos.find(product => product.id === +id))
    );
  }
}
