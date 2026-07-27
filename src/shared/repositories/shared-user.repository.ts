import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { UserType } from 'src/shared/models/user.model';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class SharedUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUser(where: Prisma.UserWhereInput): Promise<UserType | null> {
    return this.prismaService.user.findFirst({
      where,
    });
  }

  findUniqueUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
    });
  }

  updateUniqueUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUncheckedUpdateInput) {
    return this.prismaService.user.update({
      where,
      data,
    });
  }
}
