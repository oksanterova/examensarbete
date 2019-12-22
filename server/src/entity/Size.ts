import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  size!: number;

  constructor(params: { size: number }) {
    super();

    if (params) {
      this.size = params.size;
    }
  }
}
