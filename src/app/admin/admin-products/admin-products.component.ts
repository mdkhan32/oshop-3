import {
  AfterViewInit,
  ViewChild,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription!: Subscription;

  displayedColumns: string[] = ['id', 'title', 'price', ''];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe((p: any) => (this.filteredProducts = this.products = p));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
}
