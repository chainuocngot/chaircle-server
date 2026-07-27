import { Injectable } from '@nestjs/common';
import { GetMeResType } from 'src/routes/user/user.model';
import { UserType } from 'src/shared/models/user.model';
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repository';
import { UserNotFoundException } from 'src/shared/shared.error';

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
}
