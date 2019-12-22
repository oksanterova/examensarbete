import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity
} from "typeorm";
import Product from "./Product";

@Entity()
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(
    type => Product,
    product => product.categories
  )
  @JoinTable()
  products?: Product[];

  constructor(params: { name: string }) {
    super();

    if (params) {
      this.name = params.name;
    }
  }
}
