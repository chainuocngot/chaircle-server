import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { CreatePostBodyDto, CreatePostResDto } from 'src/routes/post/post.dto';
import { PostService } from 'src/routes/post/post.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { UserType } from 'src/shared/models/user.model';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(CreatePostResDto)
  createPost(@ActiveUser('userId') userId: UserType['id'], @Body() body: CreatePostBodyDto) {
    return this.postService.createPost(userId, body);
  }
}
