import { DatabaseLogService } from 'src/management/common/log_user_activities/providers/user_activities.service';
import { ResponseSystemService } from 'src/management/common/response_system/service/response_system.service';
import { LoggerService } from 'src/utils/log_service.service';
import { VerifyLoginMiddleware } from 'src/middleware/verify_user.middleware';
import { UserGroupService } from '../../services/user_group/user_group.service';

export const UserGroupManagementProviders = [
  LoggerService,
  DatabaseLogService,
  ResponseSystemService,
  VerifyLoginMiddleware,
  UserGroupService,
];
