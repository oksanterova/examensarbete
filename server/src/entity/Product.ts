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

  @ManyToMany(
    type => Size,
    size => size.products,
    { cascade: ["insert"] }
  )
  @JoinTable()
  sizes?: Size[];

  @Column()
  description!: string;

  @ManyToMany(
    type => Category,
    category => category.products,
    { cascade: ["insert"] }
  )
  @JoinTable()
  categories?: Category[];

  constructor(params: {
    name: string;
    description: string;
    categories: Category[];
    sizes: Size[];
  }) {
    super();

    if (params) {
      this.name = params.name;
      this.description = params.description;
      this.categories = params.categories;
      this.sizes = params.sizes;
    }
  }
}
