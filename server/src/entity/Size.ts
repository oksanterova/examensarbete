import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import Product from "./Product";

@Entity()
export default class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(
    type => Product,
    product => product.sizes
  )
  products?: Product[];

  constructor(params: { name: string }) {
    super();

    if (params) {
      this.name = params.name;
    }
  }
}
