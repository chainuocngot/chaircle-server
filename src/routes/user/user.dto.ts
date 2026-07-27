import { createZodDto } from 'nestjs-zod';
import { GetMeResSchema, UpdateMeBodySchema, UpdateMeResSchema } from 'src/routes/user/user.model';

export class GetMeResDto extends createZodDto(GetMeResSchema) {}

export class UpdateMeBodyDto extends createZodDto(UpdateMeBodySchema) {}

export class UpdateMeResDto extends createZodDto(UpdateMeResSchema) {}
