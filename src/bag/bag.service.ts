import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

import { EditBagItem } from './dto/editBagItem.dto';
import { BadRequestException } from '@nestjs/common';
import { AddItemToBagDTO } from './dto/addItemToBag.dto';

import shortid from 'shortid';
import { BagItem } from '@prisma/client';


@Injectable()
export class BagService {
  constructor(private prismaService: PrismaService){}

  public getAllCartItems() {
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

  public async addItemToCart(cartItem: AddItemToBagDTO): Promise<BagItem> {
    const { productId, quantity, cartItemId, ...otherData } = cartItem;


    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let existingCartItem = await this.prismaService.bagItem.findUnique({
      where: { id: cartItemId },
    });

    if (!existingCartItem) {

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
      const newQuantity = existingCartItem.quantity + quantity;
      const newSubTotal = product.price * newQuantity;

      return this.prismaService.bagItem.update({
        where: { id: cartItemId },
        data: {
          quantity: newQuantity,
          subTotal: newSubTotal,
        },
      });
    }
  }

 /* public async updateItemInCart(updateCartItemDto: EditCartItem) {
    const { cartItemId, quantity, comment } = updateCartItemDto;

    // Fetch the cart item
    const cartItem = await this.prismaService.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true },
    });

    // Throw error if cart item not found
    if (!cartItem) {
      throw new BadRequestException(`Cart item with ID ${cartItemId} not found`);
    }

    // Update the cart item
    const updatedCartItem = await this.prismaService.cartItem.update({
      where: { id: cartItemId },
      data: {
        quantity,
        comment,
        subTotal: cartItem.product.price * quantity, 
      },
    });

    return updatedCartItem;
  }*/
  
}


