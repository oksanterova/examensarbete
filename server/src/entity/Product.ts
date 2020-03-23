import {
  BaseEntity,
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from "typeorm";
import Size from "./Size";
import Category from "./Category";
import ProductImage from "./ProductImage";

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

  @Column({ nullable: false })
  productImageId!: string;

  @OneToOne(type => ProductImage)
  @JoinColumn()
  productImage!: ProductImage;

  constructor(params: {
    name: string;
    price: number;
    description: string;
    categories: Category[];
    sizes: Size[];
    productImageId: string;
  }) {
    super();

    if (params) {
      this.name = params.name;
      this.price = params.price;
      this.description = params.description;
      this.categories = params.categories;
      this.sizes = params.sizes;
      this.productImageId = params.productImageId;
    }
  }
}
