import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column
} from "typeorm";
import Cart from "./Cart";
import Product from "./Product";
import Size from "./Size";

@Entity()
export default class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  quantity!: number;

  @ManyToOne(type => Cart)
  cart!: Cart;

  @ManyToOne(type => Product)
  product!: Product;

  @ManyToOne(type => Size)
  size!: Size;

  constructor(params: {
    cart: Cart;
    product: Product;
    size: Size;
    quantity: number;
  }) {
    super();

    if (params) {
      this.cart = params.cart;
      this.product = params.product;
      this.size = params.size;
      this.quantity = params.quantity;
    }
  }
}
