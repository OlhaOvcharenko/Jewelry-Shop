import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { BagService } from 'src/bag/bag.service';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private bagService: BagService
  ) {}
  
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        products: {
          select: {
            id: true,
            quantity: true,
            name: true
          },
        },
      },
    });
  }
  
  async createOrder(orderData: CreateOrderDTO, sessionId: string): Promise<Order> {
    const { productIds, ...orderDetails } = orderData;
    console.log(orderData)
    try {
      // Create the order
      const createdOrder = await this.prismaService.order.create({
        data: {
          ...orderDetails,
          products: { connect: productIds.map(id => ({ id })) }, 
        },
      });
      await this.bagService.clearBag(sessionId);
      return createdOrder;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("One or more products don't exist");
      }
      throw error;
    }
  }
}
