import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import CartItem from "./CartItem";

@Entity()
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany(
    type => CartItem,
    item => item.cart
  )
  items!: [CartItem];
}
