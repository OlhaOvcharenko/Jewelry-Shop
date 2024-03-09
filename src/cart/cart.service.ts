import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Basket } from '@prisma/client';
import { addToCartDTO } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService){}

  public async addToCart(cartProduct: addToCartDTO): Promise<boolean> {
    const { productId, quantity } = cartProduct;
    
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });
  
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    // Check if the product is already in the user's basket
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
          productId,
          quantity,
        },
      });
    }
    
    return true;
  }
}