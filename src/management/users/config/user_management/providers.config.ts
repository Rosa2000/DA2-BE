import { DatabaseLogService } from "src/management/common/log_user_activities/providers/user_activities.service";
import { ResponseSystemService } from "src/management/common/response_system/service/response_system.service";
import { LoggerService } from "src/utils/log_service.service";
import { UserManagementService } from "../../services/user_management/user_management.service";
import { VerifyLoginMiddleware } from "src/middleware/verify_user.middleware";

export const UserManagementProviders = [
  UserManagementService,
  LoggerService,
  DatabaseLogService,
  ResponseSystemService,
  VerifyLoginMiddleware
];
