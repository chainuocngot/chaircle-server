import { Injectable } from '@nestjs/common';
import { CreatePostBodyType, CreatePostResType } from 'src/routes/post/post.model';
import { PostRepository } from 'src/routes/post/post.repository';
import { UserType } from 'src/shared/models/user.model';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(userId: UserType['id'], body: CreatePostBodyType): Promise<CreatePostResType> {
    return this.postRepository.createPost({
      ...body,
      createdById: userId,
    });
  }
}
