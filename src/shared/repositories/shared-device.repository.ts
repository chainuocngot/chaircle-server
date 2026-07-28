import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { DeviceType } from 'src/shared/models/device.model';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PrismaExecutor } from 'src/shared/types/prisma.type';

@Injectable()
export class SharedDeviceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createDevice(
    payload: Prisma.DeviceUncheckedCreateInput,
    executor: PrismaExecutor = this.prismaService,
  ): Promise<DeviceType> {
    return executor.device.create({
      data: payload,
    });
  }
}
