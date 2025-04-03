import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonGroupManagementImports,
  CommonLogManagementImports,
} from 'src/utils/common_imports';
import {
  GroupRole,
  UserGroup,
  UserGroupLevel2,
  UserGroupLevel3,
} from '../../entities/user_group/user_group.entity';

0;
export const UserGroupManagementImports = [
  TypeOrmModule.forFeature([
    ...CommonLogManagementImports,
    ...CommonGroupManagementImports,
    UserGroup,
    UserGroupLevel2,
    UserGroupLevel3,
    GroupRole,
  ]),
];
