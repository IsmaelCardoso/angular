import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from './product.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products'

  constructor(private snackBar: MatSnackBar, private http: HttpClient ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: isError ? ['snackbar-error'] : ['snackbar-success'],
      }
    )
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    )
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    )
  }

  readById(productId: string): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    )
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    )
  }

  delete(productId: string): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    )
  }

  errorHandler(error: any): Observable<any> {
    console.log(error)
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }
}
