import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { map, Observable, of, switchMap } from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.default.User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.signInWithRedirect(
      new firebase.default.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user: any) => {
        if (user)
          return this.userService
            .get(user?.uid)
            .snapshotChanges()
            .pipe(map((x) => x.payload.exportVal()));

        return of(null);
      })
    );
  }
}
