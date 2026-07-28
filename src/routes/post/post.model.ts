import { idZod } from 'src/shared/constants/zod.constant';
import { PostSchema } from 'src/shared/models/post.model';
import z from 'zod';

export const CreatePostBodySchema = PostSchema.pick({
  content: true,
  replyPermission: true,
  topicId: true,
})
  .extend({
    mediaIds: z.array(idZod).default([]),
  })
  .strict();

export const CreatePostResSchema = PostSchema;

export type CreatePostBodyType = z.infer<typeof CreatePostBodySchema>;
export type CreatePostResType = z.infer<typeof CreatePostResSchema>;
