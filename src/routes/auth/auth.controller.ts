import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { type Response } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  ChangePasswordBodyDto,
  ChangePasswordResDto,
  GetGoogleAuthorizeUrlResDto,
  GoogleOAuthCallbackQueryDto,
  GoogleOAuthCallbackResDto,
  LoginBodyDto,
  LoginResDto,
  LogoutBodyDto,
  LogoutResDto,
  RefreshTokenBodyDto,
  RefreshTokenResDto,
  RegisterBodyDto,
  RegisterResDto,
  ResetPasswordBodyDto,
  ResetPasswordQueryDto,
  ResetPasswordResDto,
  SendOtpBodyDto,
  SendOtpResDto,
  VerifyForgotPasswordOtpBodyDto,
} from 'src/routes/auth/auth.dto';
import { AuthService } from 'src/routes/auth/auth.service';
import { GoogleOAuthService } from 'src/routes/auth/google-oauth.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { IsPublic } from 'src/shared/decorators/auth.decorator';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';
import { UserType } from 'src/shared/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleOAuthService: GoogleOAuthService,
  ) {}

  @Post('register')
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(RegisterResDto)
  register(@Ip() ip: string, @UserAgent() userAgent: string, @Body() body: RegisterBodyDto) {
    return this.authService.register({
      ip,
      userAgent,
      body,
    });
  }

  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(LoginResDto)
  login(@Ip() ip: string, @UserAgent() userAgent: string, @Body() body: LoginBodyDto) {
    return this.authService.login({
      ip,
      userAgent,
      body,
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(LogoutResDto)
  logout(@ActiveUser('userId') userId: UserType['id'], @Body() body: LogoutBodyDto) {
    return this.authService.logout({
      userId,
      body,
    });
  }

  @Post('refresh-token')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(RefreshTokenResDto)
  refreshToken(@Body() body: RefreshTokenBodyDto) {
    return this.authService.refreshToken(body);
  }

  @Post('send-otp')
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(SendOtpResDto)
  sendOtp(@Body() body: SendOtpBodyDto) {
    return this.authService.sendOtp(body);
  }

  @Post('verify-forgot-password-otp')
  @IsPublic()
  @HttpCode(HttpStatus.PERMANENT_REDIRECT)
  async verifyForgotPasswordOtp(
    @Res() res: Response,
    @Body() body: VerifyForgotPasswordOtpBodyDto,
  ) {
    const redirectUrl = await this.authService.verifyForgotPasswordOtp(body);
    return res.redirect(redirectUrl);
  }

  @Put('reset-password')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(ResetPasswordResDto)
  resetPassword(@Query() query: ResetPasswordQueryDto, @Body() body: ResetPasswordBodyDto) {
    return this.authService.resetPassword(query, body);
  }

  @Put('change-password')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(ChangePasswordResDto)
  changePassword(
    @ActiveUser('userId') userId: UserType['id'],
    @Body() body: ChangePasswordBodyDto,
  ) {
    return this.authService.changePassword(userId, body);
  }

  @Get('google')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(GetGoogleAuthorizeUrlResDto)
  getGoogleAuthorizeUrl(@Ip() ip: string, @UserAgent() userAgent: string) {
    const authorizeUrl = this.googleOAuthService.getAuthorizeUrl(ip, userAgent);
    return {
      url: authorizeUrl,
    };
  }

  @Get('google/callback')
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(GoogleOAuthCallbackResDto)
  googleOAuthCallback(@Query() query: GoogleOAuthCallbackQueryDto) {
    return this.googleOAuthService.callback(query);
  }
}
