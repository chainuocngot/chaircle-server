import { createZodDto } from 'nestjs-zod';
import {
  GetMeResSchema,
  GetUserParamSchema,
  GetUserResSchema,
  UpdateMeBodySchema,
  UpdateMeResSchema,
} from 'src/routes/user/user.model';

export class GetMeResDto extends createZodDto(GetMeResSchema) {}

export class UpdateMeBodyDto extends createZodDto(UpdateMeBodySchema) {}

export class UpdateMeResDto extends createZodDto(UpdateMeResSchema) {}

export class GetUserParamDto extends createZodDto(GetUserParamSchema) {}

export class GetUserResDto extends createZodDto(GetUserResSchema) {}
