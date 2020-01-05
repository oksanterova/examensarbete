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

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  address?: string;

  @OneToMany(
    type => Order,
    order => order.user
  )
  orders?: Order[];

  constructor(params: { isAdmin: boolean; email: string; password: string }) {
    super();

    if (params) {
      this.isAdmin = params.isAdmin;
      this.email = params.email;
      this.password = params.password;
    }
  }
}
