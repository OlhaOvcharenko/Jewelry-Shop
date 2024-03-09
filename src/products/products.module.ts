import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartService } from 'src/cart/cart.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, CartService], 
  imports: [],
})
export class ProductsModule {}
