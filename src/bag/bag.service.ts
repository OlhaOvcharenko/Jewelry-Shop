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
            },
          },
        },
    });
  }


  public async addItemToBag(bagProduct: AddItemToBagDTO): Promise<BagItem> {
    const { productId, quantity, ...otherData } = bagProduct;

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
      const subTotal = product.price * quantity;

      return this.prismaService.bagItem.create({
        data: {
          ...otherData,
          quantity,
          subTotal,
          product: { connect: { id: productId } },
        },
      });
    } else {
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

    // Fetch the cart item
    const cartItem = await this.prismaService.bagItem.findUnique({
      where: { id: bagItemId },
      include: { product: true },
    });

    // Throw error if cart item not found
    if (!cartItem) {
      throw new BadRequestException(`Cart item with ID ${bagItemId} not found`);
    }

    // Update the cart item
    await this.prismaService.bagItem.update({
      where: { id: bagItemId },
      data: {
        quantity,
        comment,
        subTotal: cartItem.product.price * quantity,
      },
    });
  }
  
}


