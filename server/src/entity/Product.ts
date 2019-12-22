import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn
} from "typeorm";
import Size from "./Size";
import Category from "./Category";

@Entity()
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(type => Size)
  sizes?: Size[];

  @Column()
  quantity!: number;

  @ManyToMany(
    type => Category,
    category => category.products
  )
  @JoinTable()
  categories?: Category[];

  constructor(params: { name: string; quantity: number }) {
    super();

    if (params) {
      this.name = params.name;
      this.quantity = params.quantity;
    }
  }
}
