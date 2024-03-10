import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Get } from '@nestjs/common';


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
