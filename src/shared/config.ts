import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import z from 'zod';

const envFilePath = path.resolve('.env');

if (!fs.existsSync(envFilePath)) {
  console.error(
    'The .env file could not be found. Please create a .env file and configure the required environment variables.',
  );
  process.exit(1);
}

const envSchema = z.object({
  DATABASE_URL: z.url(),
  APP_PORT: z.coerce.number(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  TOKEN_ALGORITHM: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error);
  process.exit(1);
}

const envConfig = parsedEnv.data;

export default envConfig;
