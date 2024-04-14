import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent implements OnInit {

  productId = this.route.snapshot.paramMap.get('id')
  product: Product = {
    id: 0,
    name: '',
    price: 0,
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if(this.productId) this.productService.readById(this.productId).subscribe((product) => {
      this.product = product
    })
  }

  deleteProduct(): void {
    if(this.productId) this.productService.delete(this.productId).subscribe(() => {
      this.productService.showMessage('Produto removido com sucesso!')

      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
