import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Get, Put } from '@nestjs/common';

import { Body } from '@nestjs/common';

import { EditCartItem } from './dto/editCartItem.dto';

@Controller()
export class CartController {
  constructor(private cartService: CartService) {}
   
  @Get('/cart')
  async getCart() {
    return this.cartService.getAllCartItems();
  }

  @Put('/cart')
  async updateCartItem(@Body() updateCartItemDto: EditCartItem) {
    return this.cartService.updateItemInCart(updateCartItemDto);
  }
}
