import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced!: number;
  items: any[];
  constructor(
    public userId: string | undefined,
    public shipping: any,
    public shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

    this.items = this.shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}
