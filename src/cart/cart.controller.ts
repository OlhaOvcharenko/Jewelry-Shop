import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Get, Put } from '@nestjs/common';

import { Body } from '@nestjs/common';

import { EditCartItem } from './dto/editCartItem.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
   
  @Get('/')
  async getCart() {
    return this.cartService.getAllCartItems();
  }
  
  /*@Put('/')
  async updateCartItem(@Body() updateCartItemDto: EditCartItem) {
    return this.cartService.updateItemInCart(updateCartItemDto);
  }*/
}
