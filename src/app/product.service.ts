import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((x) =>
          x.map((y) => {
            return {
              key: y.key,
              title: y.payload.exportVal().title,
              price: y.payload.exportVal().price,
              category: y.payload.exportVal().category,
              imageUrl: y.payload.exportVal().imageUrl,
            };
          })
        )
      );
  }

  get(productId: any) {
    return this.db
      .object('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map((x) => {
          return x.payload.exportVal();
        })
      );
  }

  update(productId: string, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any) {
    return this.db.object('/products/' + productId).remove();
  }
}
