import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart!: ShoppingCart;
  shipping: any = {};
  cartSubscription!: Subscription;
  userSubscription!: Subscription;
  userId: string | undefined;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user?.uid)
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  // async placeOrder() {
  //   let order = {
  //     userId: this.userId,
  //     datePlace: new Date().getTime(),
  //     shipping: this.shipping,
  //     items: this.cart.items.map((i) => {
  //       return {
  //         product: {
  //           title: i.product.title,
  //           imageUrl: i.product.imageUrl,
  //           price: i.product.price,
  //         },
  //         quantity: i.quantity,
  //         totalPrice: i.totalPrice,
  //       };
  //     }),
  //   };
  //   let result = await this.orderService.placeOrder(order);
  //   this.router.navigate(['/order-success', result.key]);
  // }
}
