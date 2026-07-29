import { Injectable } from '@nestjs/common';
import {
  GetMeResType,
  GetUserResType,
  UpdateMeBodyType,
  UpdateMeResType,
} from 'src/routes/user/user.model';
import { UserType } from 'src/shared/models/user.model';
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repository';
import { UsernameAlreadyTakenException, UserNotFoundException } from 'src/shared/shared.error';
import { isUniqueConstraintPrismaError } from 'src/shared/utils/prisma.util';

@Injectable()
export class UserService {
  constructor(private readonly sharedUserRepository: SharedUserRepository) {}

  async getMe(userId: UserType['id']): Promise<GetMeResType> {
    const user = await this.sharedUserRepository.findUniqueUser({
      id: userId,
    });

    if (user === null) {
      throw UserNotFoundException;
    }

    return user;
  }

  async updateMe(userId: UserType['id'], body: UpdateMeBodyType): Promise<UpdateMeResType> {
    try {
      const me = await this.sharedUserRepository.findUniqueUser({
        id: userId,
        deletedAt: null,
      });

      if (me === null) {
        throw UserNotFoundException;
      }

      return await this.sharedUserRepository.updateUniqueUser(
        {
          id: userId,
          deletedAt: null,
        },
        body,
      );
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw UsernameAlreadyTakenException;
      }

      throw error;
    }
  }

  async getUser(userId: UserType['id']): Promise<GetUserResType> {
    const user = await this.sharedUserRepository.findUniqueUser({
      id: userId,
      deletedAt: null,
    });

    if (user === null) {
      throw UserNotFoundException;
    }

    return user;
  }
}
