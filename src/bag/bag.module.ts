import { Module } from '@nestjs/common';
import { BagController } from './bag.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BagService } from './bag.service';

@Module({
  controllers: [BagController],
  providers: [BagService, PrismaService],
})
export class BagModule {}
