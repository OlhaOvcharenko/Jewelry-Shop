import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

import { EditCartItem } from './dto/editCartItem.dto';
import { BadRequestException } from '@nestjs/common';
import { addItemToCartDTO } from './dto/addItemToCart.dto';
import { CartItem } from '@prisma/client';
import shortid from 'shortid';


@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService){}

  public async getAllCartItems() {
    return this.prismaService.cartItem.findMany({
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

  public async addItemToCart(cartItem: addItemToCartDTO): Promise<CartItem> {
    const { productId, quantity, cartItemId, ...otherData } = cartItem;


    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let existingCartItem = await this.prismaService.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!existingCartItem) {

      const subTotal = product.price * quantity;

      return this.prismaService.cartItem.create({
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

      return this.prismaService.cartItem.update({
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


