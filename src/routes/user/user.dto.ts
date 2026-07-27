import { createZodDto } from 'nestjs-zod';
import { GetMeResSchema } from 'src/routes/user/user.model';

export class GetMeResDto extends createZodDto(GetMeResSchema) {}
