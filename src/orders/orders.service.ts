import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  
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
  
  async createOrder(orderData: CreateOrderDTO): Promise<Order> {
    const { productIds, ...orderDetails } = orderData;
    console.log(orderData)
    try {
      // Create the order
      const createdOrder = await this.prismaService.order.create({
        data: {
          ...orderDetails,
          products: { connect: productIds.map(id => ({ id })) }, // Connect products by their IDs
        },
      });

      return createdOrder;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("One or more products don't exist");
      }
      throw error;
    }
  }
}
