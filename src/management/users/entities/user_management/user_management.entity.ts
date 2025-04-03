import { UserGroup } from "src/management/user_groups/entities/user_group/user_group.entity";
import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany } from "typeorm";

@Entity("users")
export class UserInformation {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  gender: string;

  @Column()
  citizen_id: string;

  @Column()
  address: string;

  @Column()
  ward: string;

  @Column()
  district: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @Column()
  postcode: string;

  @Column()
  username: string;

  @Column()
  status_id: number;

  @Column()
  modified_date: Date;

  @Column()
  deleted_date: Date;

  @Column()
  created_date: Date;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  user_group: UserGroup[];
}

@Entity("users")
export class AddUserInformation {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  gender: string;

  @Column()
  citizen_id: string;

  @Column()
  address: string;

  @Column()
  ward: string;

  @Column()
  district: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @Column()
  postcode: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  status_id: number;

  @Column()
  modified_date: Date;
}
