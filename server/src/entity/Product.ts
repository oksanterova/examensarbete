import {
  BaseEntity,
  Entity,
  Column,
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

  @Column({ default: 0 })
  price!: number;

  @ManyToMany(
    type => Size,
    size => size.products,
    { cascade: ["insert", "remove"] }
  )
  @JoinTable()
  sizes?: Size[];

  @Column()
  description!: string;

  @ManyToMany(
    type => Category,
    category => category.products,
    { cascade: ["insert", "remove"] }
  )
  @JoinTable()
  categories?: Category[];

  constructor(params: {
    name: string;
    price: number;
    description: string;
    categories: Category[];
    sizes: Size[];
  }) {
    super();

    if (params) {
      this.name = params.name;
      this.price = params.price;
      this.description = params.description;
      this.categories = params.categories;
      this.sizes = params.sizes;
    }
  }
}
