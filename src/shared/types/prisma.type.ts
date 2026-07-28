import * as runtime from '@prisma/client/runtime/client';
import { PrismaClient } from 'src/generated/prisma/client';

export type PrismaExecutor = Omit<PrismaClient, runtime.ITXClientDenyList>;
