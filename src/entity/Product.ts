import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;
}
