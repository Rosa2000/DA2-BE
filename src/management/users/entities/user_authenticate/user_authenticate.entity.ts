import { UserGroup } from "src/management/user_groups/entities/user_group/user_group.entity";
import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ObjectIdColumn,
  ObjectId
} from "typeorm";

@Entity("users")
export class UserLoginInformation {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column({ type: "nvarchar", length: 500 })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  status_id: number;
}

@Entity("users")
export class UserVerifyInformation {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  status_id: number;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user_verify)
  user_group: UserGroup[];
}

@Entity("users")
export class UserChangePassword {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  modified_date: Date;
}

@Entity("users")
export class ChangePasswordInformation {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  modified_date: Date;
}
