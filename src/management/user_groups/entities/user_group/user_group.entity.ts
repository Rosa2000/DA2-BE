import { UserVerifyInformation } from "src/management/users/entities/user_authenticate/user_authenticate.entity";
import { UserInformation } from "src/management/users/entities/user_management/user_management.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  ObjectId
} from "typeorm";

// import { VendorInformation } from "src/management_portal/vendors/entity/vendors.entity";

@Entity("user_group")
export class UserGroup {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column()
  group_id: number;

  @Column()
  user_id: string;

  //   @ManyToOne(() => VendorInformation, (vendor) => vendor.user_group)
  //   @JoinColumn({ name: "user_id", referencedColumnName: "user_id" })
  //   vendor: VendorInformation;

  @ManyToOne(() => UserInformation, (user) => user.user_group)
  @JoinColumn({ name: "user_id" })
  user: UserInformation;

  @ManyToOne(() => UserInformation, (user) => user.user_group)
  @JoinColumn({ name: "user_id" })
  user_verify: UserInformation;
}

@Entity("group_role")
export class GroupRole {
  @ObjectIdColumn() // Khóa chính dạng ObjectId của MongoDB
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  permission: string;

  @Column()
  status_id: number;

  @Column()
  deleted_date: Date;

  @Column()
  modified_date: Date;

  @Column()
  created_date: Date;
}
