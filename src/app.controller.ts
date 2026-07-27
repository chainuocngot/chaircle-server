import { Controller, Get } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/auth.decorator';

@Controller()
export class AppController {
  @Get('health')
  @IsPublic()
  health(): {
    status: string;
  } {
    return {
      status: 'ok',
    };
  }
}
