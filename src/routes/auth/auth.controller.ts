import { Body, Controller, HttpCode, HttpStatus, Ip, Post } from '@nestjs/common';
import { Request } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  LoginBodyDto,
  LoginResDto,
  LogoutBodyDto,
  LogoutResDto,
  RefreshTokenBodyDto,
  RefreshTokenResDto,
  RegisterBodyDto,
  RegisterResDto,
  SendOtpBodyDto,
  SendOtpResDto,
} from 'src/routes/auth/auth.dto';
import { AuthService } from 'src/routes/auth/auth.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { IsPublic } from 'src/shared/decorators/auth.decorator';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';
import { UserType } from 'src/shared/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
