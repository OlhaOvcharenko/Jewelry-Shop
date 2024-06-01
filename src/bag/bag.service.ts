import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AddItemToBagDTO } from './dto/addItemToBag.dto';
import { BagItem } from '@prisma/client';
import { EditBagItem } from './dto/editBagItem.dto';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class BagService {
  constructor(private prismaService: PrismaService){}

  public getAllBagItems() {
    return this.prismaService.bagItem.findMany({
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              photo: true,
              size: true,
            },
          },
        },
    });
  }


  public async addItemToBag(bagProduct: AddItemToBagDTO): Promise<BagItem> {
    const { productId, quantity, size, sessionId, ...otherData } = bagProduct;

    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let existingBagItem = await this.prismaService.bagItem.findFirst({
      where: {
        productId: productId, 
      },
    });

    if (!existingBagItem) {
      // New bag item
      const subTotal = product.price * quantity;

      return this.prismaService.bagItem.create({
        data: {
          ...otherData,
          quantity,
          size,
          subTotal,
          sessionId,
          product: { connect: { id: productId } },
        },
      });
    } else {
      // Existing bag item with the same size, update quantity and subtotal
      const newQuantity = existingBagItem.quantity + quantity;
      const newSubTotal = product.price * newQuantity;

      return this.prismaService.bagItem.update({
        where: { id: existingBagItem.id },
        data: {
          quantity: newQuantity,
          subTotal: newSubTotal,
        },
      });
    }
 }

  public deleteById(id: BagItem['id']): Promise<BagItem> {
    return this.prismaService.bagItem.delete({
      where: { id },
    });
  }

  public async submitItemsInBag(submitItemsDto: EditBagItem): Promise<void> {
    const { bagItemId, quantity, comment } = submitItemsDto;

    const cartItem = await this.prismaService.bagItem.findUnique({
      where: { id: bagItemId },
      include: { product: true },
    });

  
    if (!cartItem) {
      throw new BadRequestException(`Cart item with ID ${bagItemId} not found`);
    }

    await this.prismaService.bagItem.update({
      where: { id: bagItemId },
      data: {
        quantity,
        comment,
        subTotal: cartItem.product.price * quantity,
      },
    });
  }
   
  async clearBag(sessionId: string): Promise<void> {
    await this.prismaService.bagItem.deleteMany({
      where: {
        sessionId: sessionId,
      },
    });
  }
}


