import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BagService } from 'src/bag/bag.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, BagService]
})
export class OrdersModule {}
