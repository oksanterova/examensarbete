import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import Order from "./Order";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  @Column()
  address!: string;

  @OneToMany(
    type => Order,
    order => order.user
  )
  orders!: Order[];

  constructor(params: {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    orders: Order[];
  }) {
    super();

    if (params) {
      this.firstname = params.firstname;
      this.lastname = params.lastname;
      this.email = params.email;
      this.address = params.address;
      this.orders = params.orders;
    }
  }
}
