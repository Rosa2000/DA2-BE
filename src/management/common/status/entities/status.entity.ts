import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("status")
export class Status {
  @PrimaryColumn()
  id: number;

  @Column({ type: "nvarchar", length: 500 })
  code: string;

  @Column()
  description: string;
}
