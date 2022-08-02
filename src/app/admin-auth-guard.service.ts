import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((x) => x.isAdmin));
  }
}
