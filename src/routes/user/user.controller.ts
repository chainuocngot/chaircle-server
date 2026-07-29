import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  GetMeResDto,
  GetUserParamDto,
  GetUserResDto,
  UpdateMeBodyDto,
  UpdateMeResDto,
} from 'src/routes/user/user.dto';
import { UserService } from 'src/routes/user/user.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { IsPublic } from 'src/shared/decorators/auth.decorator';
import { UserType } from 'src/shared/models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(GetMeResDto)
  getMe(@ActiveUser('userId') userId: UserType['id']) {
    return this.userService.getMe(userId);
  }

  @Put('me')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(UpdateMeResDto)
  updateMe(@ActiveUser('userId') userId: UserType['id'], @Body() body: UpdateMeBodyDto) {
    return this.userService.updateMe(userId, body);
  }

  @Get(':userId')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(GetUserResDto)
  getUser(@Param() param: GetUserParamDto) {
    return this.userService.getUser(param.userId);
  }
}
