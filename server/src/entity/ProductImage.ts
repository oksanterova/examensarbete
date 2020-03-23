import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
  OneToOne
} from "typeorm";
import Product from "./Product";

@Entity()
export default class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "bytea", nullable: false })
  buffer!: Buffer;

  constructor(params: { buffer: Buffer }) {
    super();

    if (params) {
      this.buffer = params.buffer;
    }
  }
}
