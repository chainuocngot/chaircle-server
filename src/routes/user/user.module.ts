import { Module } from '@nestjs/common';
import { UserRepository } from 'src/routes/user/user.repository';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
