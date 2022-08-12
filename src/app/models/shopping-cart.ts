import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  getQuantity(product: Product) {
    if (!this.itemsMap) return 0;

    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    if (this.itemsMap) {
      Object.values(this.itemsMap).forEach((item: any) => {
        count += item.quantity;
      });
    }
    return count;
  }

  get totalPrice() {
    let totalPrice = 0;
    Object.values(this.items).forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  }
}
