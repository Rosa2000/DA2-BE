import { TypeOrmModule } from "@nestjs/typeorm";
import {
  ChangePasswordInformation,
  UserLoginInformation,
  UserVerifyInformation
} from "../../entities/user_authenticate/user_authenticate.entity";

export const UserAuthenticateManagementImports = [
  TypeOrmModule.forFeature([
    UserLoginInformation,
    UserVerifyInformation,
    ChangePasswordInformation
  ])
];
