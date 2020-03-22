import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  BaseEntity
} from "typeorm";
import Size from "./Size";
import Order from "./Order";
import Product from "./Product";

@Entity()
export default class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 0 })
  price!: number;

  @ManyToOne(type => Size)
  size!: Size;

  @ManyToOne(type => Product)
  product!: Product;

  @Column()
  quantity!: number;

  @ManyToOne(type => Order)
  order!: Order;

  constructor(params: { size: Size; product: Product; quantity: number }) {
    super();

    if (params) {
      this.size = params.size;
      this.product = params.product;
      this.quantity = params.quantity;
    }
  }
}
