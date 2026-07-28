import { PostReplyPermission } from 'src/shared/constants/post.constant';
import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const PostSchema = z.object({
  id: idZod,

  content: z.string().max(5000).trim(),

  likeCount: z.number().int().nonnegative(),
  viewCount: z.number().int().nonnegative(),
  commentCount: z.number().int().nonnegative(),
  repostCount: z.number().int().nonnegative(),

  replyPermission: z.enum(PostReplyPermission),

  topicId: idZod.nullable(),

  createdById: idZod.nullable(),
  updatedById: idZod.nullable(),
  deletedById: idZod.nullable(),

  createdAt: dateTimeZod,
  updatedAt: dateTimeZod.nullable(),
  deletedAt: dateTimeZod.nullable(),
});

export type PostType = z.infer<typeof PostSchema>;
