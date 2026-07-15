import { Body, Controller, HttpCode, HttpStatus, Ip, Post } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  LoginBodyDto,
  LoginResDto,
  RegisterBodyDto,
  RegisterResDto,
} from 'src/routes/auth/auth.dto';
import { AuthService } from 'src/routes/auth/auth.service';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
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
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(LoginResDto)
  login(@Ip() ip: string, @UserAgent() userAgent: string, @Body() body: LoginBodyDto) {
    return this.authService.login({
      ip,
      userAgent,
      body,
    });
  }
}
