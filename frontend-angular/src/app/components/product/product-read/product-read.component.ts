import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrl: './product-read.component.css'
})
export class ProductReadComponent implements OnInit {

  products: Product[] = [{
    id: 0,
    name: '',
    price: 0,
  }]
  displayedColumns: string[] = ['id', 'name', 'price', 'action']

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products

      console.log(this.products)
    })
  }
}
