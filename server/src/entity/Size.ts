import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  constructor(params: { name: string }) {
    super();

    if (params) {
      this.name = params.name;
    }
  }
}
