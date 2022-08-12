import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  category!: any;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription!: Subscription;
  shoppingCart!: ShoppingCart;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.productService
      .getAll()
      .pipe(
        switchMap((p: any) => {
          this.filteredProducts = this.products = p;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.filteredProducts = this.category
          ? this.products.filter((p) =>
              this.category.toLowerCase().includes(p.category.toLowerCase())
            )
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => (this.shoppingCart = cart)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
