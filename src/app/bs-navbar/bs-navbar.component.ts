import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  appUser!: AppUser;
  cart$!: Observable<ShoppingCart>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: ShoppingCartService
  ) {
    this.authService.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  async ngOnInit() {
    this.cart$ = await await this.cartService.getCart();
  }
}
