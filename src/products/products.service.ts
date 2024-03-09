import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
import { Order } from '@prisma/client';

@Injectable()
export class ProductsService {
   constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }


  public async addToOrder(productId: string, orderId: string): Promise <Order | null> {
    try {
      // Retrieve the product based on productId
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error('Product not found');
      }

      // Retrieve the order based on orderId
      let order = await this.prismaService.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Add the product to the order
      order = await this.prismaService.order.update({
        where: { id: orderId },
        data: {
          products: {
            create: [product],
          },
        },
      });

      return order;
    } catch (error) {
      console.error('Error adding product to order:', error);
      throw new Error('Failed to add product to order');
    }
  }

}
