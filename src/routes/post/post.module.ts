import { Module } from '@nestjs/common';
import { PostRepository } from 'src/routes/post/post.repository';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
