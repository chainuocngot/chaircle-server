import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PostType } from 'src/shared/models/post.model';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createPost(payload: Prisma.PostUncheckedCreateInput): Promise<PostType> {
    return this.prismaService.post.create({
      data: payload,
    });
  }
}
