import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  BaseEntity,
  OneToMany
} from "typeorm";
import User from "./User";
import OrderItem from "./OrderItem";

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

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
  user!: User;

  constructor(params: {
    address: string;
    createdAt: Date;
    items: OrderItem[];
  }) {
    super();

    if (params) {
      this.address = params.address;
      this.createdAt = params.createdAt;
      this.items = params.items;
    }
  }
}
