import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list('/categories')
      .snapshotChanges()
      .pipe(
        map((c1) =>
          c1.map((c2) => {
            return {
              key: c2.key,
              name: c2.payload.exportVal().name,
            };
          })
        )
      );
  }

  test() {
    return this.db
      .list('/categories')
      .snapshotChanges()
      .pipe(
        map((c1) =>
          c1.map((c2) => {
            return {
              key: c2.key,
              value: c2.payload.exportVal().name,
            };
          })
        )
      );
  }
}
