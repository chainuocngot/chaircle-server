export const PostReplyPermission = {
  Everyone: 'EVERYONE',
  Followers: 'FOLLOWERS',
  Following: 'FOLLOWING',
  Mentioned: 'MENTIONED',
} as const;

export type TypeOfPostReplyPermission =
  (typeof PostReplyPermission)[keyof typeof PostReplyPermission];
