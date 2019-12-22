import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User extends BaseEntity {
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
