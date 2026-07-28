import { createZodDto } from 'nestjs-zod';
import { CreatePostBodySchema, CreatePostResSchema } from 'src/routes/post/post.model';

export class CreatePostBodyDto extends createZodDto(CreatePostBodySchema) {}

export class CreatePostResDto extends createZodDto(CreatePostResSchema) {}
