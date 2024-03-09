import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { addToCartDTO } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService){}

  public async addToCart(cartProduct: addToCartDTO): Promise<boolean> {

    const { productId, quantity, ...otherData } = cartProduct;
    
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });
  
    if (!product) {
      throw new NotFoundException('Product not found');
    } else {

      const totalAmount = quantity * product.price;

      const existingItem = await this.prismaService.cart.findFirst({
        where: { productId },
      });

      if (existingItem) {
        await this.prismaService.cart.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        await this.prismaService.cart.create({
          data: {
            ...otherData,
            quantity,
            totalAmount,
            product: {
              connect: { id: productId },
            },
          },
        });
      }
    } 
    return true;
  }
}