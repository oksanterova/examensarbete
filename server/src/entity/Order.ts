import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany
} from "typeorm";
import User from "./User";
import OrderItem from "./OrderItem";

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  address!: string;

  @Column()
  createdAt!: Date;

  @OneToMany(
    type => OrderItem,
    item => item.order,
    { cascade: true }
  )
  items?: OrderItem[];

  @ManyToOne(
    type => User,
    user => user.orders
  )
  user?: User;

  constructor(params: {
    user?: User;
    address: string;
    createdAt: Date;
    items: OrderItem[];
  }) {
    super();

    if (params) {
      this.user = params.user;
      this.address = params.address;
      this.createdAt = params.createdAt;
      this.items = params.items;
    }
  }
}
