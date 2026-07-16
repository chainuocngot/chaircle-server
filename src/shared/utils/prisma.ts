import { Prisma } from 'src/generated/prisma/client';

export const isUniqueConstraintPrismaError = (
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';

export const isNotFoundPrismaError = (
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
