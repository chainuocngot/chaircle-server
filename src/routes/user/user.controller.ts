import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { GetMeResDto } from 'src/routes/user/user.dto';
import { UserService } from 'src/routes/user/user.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
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
}
