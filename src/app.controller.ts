import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('health')
  health(): {
    status: string;
  } {
    return {
      status: 'ok',
    };
  }
}
