import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { addToCartDTO } from './dto/add-to-cart.dto';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService){}

  public async getAllCartItems() {
    return this.prismaService.cart.findMany({
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    photo: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });
  }

  public async addToCart( cartProduct: Omit<Cart, 'id' | 'createdAt' | 'updatedAt' | 'totalAmount' >,): Promise<Cart> {

    const { productId, quantity, ...otherData } = cartProduct;

    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Calculate totalAmount based on the product's price and quantity
    const totalAmount = product.price * quantity;

    // Create the cart item with the calculated totalAmount
    return this.prismaService.cart.create({
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
