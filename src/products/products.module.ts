import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { BagService } from 'src/bag/bag.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, BagService], 
})
export class ProductsModule {}
