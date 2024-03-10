import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        cartItem: {
          select: {
            id: true,
            quantity: true,
            comment: true,
            subtotal: true,
            productId: true,
            product: true
          },
        },
      },
  });
  }
  
  public async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { cartItemId, ...otherData } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          cartItem: {
            connect: { id: cartItemId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }
}
