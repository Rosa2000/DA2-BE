import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { UserAuthenticateService } from "../../services/user_authenticate/user_authenticate.service";
import {
  ErrorResponseDto,
  LoginManagementDto,
  RegisterManagementDto,
  ResetPasswordDto,
  VerifyEmail
} from "../../dtos/user_authenticate/user_authenticate.dto";
import {
  ManagementLoginRequestData,
  RegisterManagementRequestData,
  ResetPasswordData
} from "../../interfaces/user_authenticate/user_authenticate.interface";
import { responseMessage } from "src/utils/constant";
import { VerifyLoginMiddleware } from "src/middleware/verify_user.middleware";
import { NextFunction } from "express";

@Controller("/v1/auth_management")
@ApiTags("API Authenticate quản lý hệ thống")
export class UserAuthenticateManagementController {
  constructor(private readonly authenticateService: UserAuthenticateService) {}

  @Post("/login_admin")
  @ApiOperation({ summary: "Đăng nhập trên trang Admin" })
  @ApiBody({ type: LoginManagementDto }) // Use type object to define the schema
  @ApiResponse({
    status: 400,
    description: "Yêu cầu không hợp lệ",
    type: ErrorResponseDto
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi dịch vụ",
    type: ErrorResponseDto
  })
  async handleLoginManagement(
    @Body() loginRequest: ManagementLoginRequestData,
    @Req() req: any,
    @Res() res: any
  ): Promise<any> {
    try {
      const user = await this.authenticateService.validateUserManagement(
        loginRequest.username,
        loginRequest.password
      );

      if (user) {
        // const logData = {
        //   ipAddress: req.ip,
        //   userAgent: req.headers["user-agent"],
        //   userId: user.user.id,
        //   accessToken: user.accessToken
        // };
        // await this.databaseLogService.handleUserActivities(
        //   "login_admin",
        //   logData
        // );
        // await this.responseSystemService.saveAuditLog(
        //   "login_admin",
        //   req,
        //   res,
        //   user
        // );
        return res.status(HttpStatus.OK).json({
          code: 0,
          message: responseMessage.success,
          data: user
        });
      }
    } catch (error) {
      //Log thông tin vào bảng audit_log
      // await this.responseSystemService.saveAuditLog(
      //   "login_admin",
      //   req,
      //   res,
      //   error,
      //   false
      // );
      console.log(error);
    }
  }

  @Post("/register")
  @ApiOperation({
    summary: "Đăng ký tài khoản mới",
    description:
      "Lưu ý: Trường hợp đăng ký user ở trang admin isAdmin sẽ là true, còn lại là false"
  })
  @ApiResponse({
    status: 400,
    description: "Yêu cầu không hợp lệ",
    type: ErrorResponseDto
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi dịch vụ",
    type: ErrorResponseDto
  })
  @ApiBody({ type: RegisterManagementDto })
  async handleRegister(
    @Body() registerRequest: RegisterManagementRequestData,
    @Req() req: any,
    @Res() res: any
  ): Promise<any> {
    try {
      await this.authenticateService.registerUserManagement(registerRequest);
      // await this.responseSystemService.saveAuditLog(
      //   "register",
      //   req,
      //   res,
      //   newUser
      // );

      return res.status(HttpStatus.OK).json({
        code: 0,
        message: responseMessage.success
      });
    } catch (error) {
      const status =
        error.status !== 500 ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.status !== 500
          ? error.response.message
          : responseMessage.serviceError;
      const code = error.status !== 500 ? error.response.code : -6;

      return res.status(status).json({ code, message });
    }
  }

  @Get("/verify_login")
  @ApiOperation({ summary: "Xác thực đăng nhập" })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token cho authentication",
    required: true
  })
  @UseGuards(VerifyLoginMiddleware)
  async getVerifyLogin(
    @Req() req: any,
    @Res() res: any,
    next: NextFunction
  ): Promise<any> {
    try {
      res.status(HttpStatus.OK).json({
        code: 0,
        message: responseMessage.success,
        data: req.userData
      });
    } catch (error) {
      next(error);
    }
  }

  @Get("/verify_email")
  @ApiOperation({
    summary: "Xác thực email",
    description: "Sử dụng cho mục đích reset password"
  })
  @ApiQuery({ type: VerifyEmail })
  async getVerifyEmail(
    @Query() emailUser: VerifyEmail,
    @Req() req: any,
    @Res() res: any
  ): Promise<any> {
    const { email } = emailUser;
    try {
      if (!email) {
        res
          .status(HttpStatus.OK)
          .json({ code: -2, message: responseMessage.notFound });
      }
      const emailResult = await this.authenticateService.getVerifyEmail(email);
      if (!emailResult) {
        res
          .status(HttpStatus.OK)
          .json({ code: -4, message: responseMessage.notFound });
      } else {
        res.status(HttpStatus.OK).json({
          code: 0,
          message: responseMessage.success,
          data: { ...emailResult }
        });
      }
    } catch (error) {
      // await this.responseSystemService.saveAuditLog(
      //   "verify_email",
      //   req,
      //   res,
      //   error,
      //   false
      // );
    }
  }

  @Post("/reset_password")
  @ApiOperation({ summary: "Reset password mới" })
  @ApiBody({ type: ResetPasswordDto })
  async handleResetPassword(
    @Body() resetPasswordData: ResetPasswordData,
    @Req() req: any,
    @Res() res: any
  ): Promise<any> {
    try {
      await this.authenticateService.handleResetPassword(resetPasswordData);
      // await this.responseSystemService.saveAuditLog(
      //   "reset_password",
      //   req,
      //   res,
      //   resetPasswordData
      // );

      return res.status(HttpStatus.OK).json({
        code: 0,
        message: responseMessage.success
      });
    } catch (error) {
      // await this.responseSystemService.saveAuditLog(
      //   "reset_password",
      //   req,
      //   res,
      //   error,
      //   false
      // );
    }
  }
}
