import { Controller } from '@nestjs/common';
import { BagService } from './bag.service';
import { Get } from '@nestjs/common';


@Controller('bag')
export class BagController {
  constructor(private cartService: BagService) {}
   
  @Get('/')
  async getBag() {
    return this.cartService.getAllBagItems();
  }
  
  /*@Put('/')
  async updateCartItem(@Body() updateCartItemDto: EditCartItem) {
    return this.cartService.updateItemInCart(updateCartItemDto);
  }*/
}
