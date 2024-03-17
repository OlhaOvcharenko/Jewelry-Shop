import { Controller } from '@nestjs/common';
import { BagService } from './bag.service';
import { Get } from '@nestjs/common';


@Controller('cart')
export class BagController {
  constructor(private cartService: BagService) {}
   
  @Get('/')
  async getCart() {
    return this.cartService.getAllCartItems();
  }
  
  /*@Put('/')
  async updateCartItem(@Body() updateCartItemDto: EditCartItem) {
    return this.cartService.updateItemInCart(updateCartItemDto);
  }*/
}
