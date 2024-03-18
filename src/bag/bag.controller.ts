import { Controller } from '@nestjs/common';
import { BagService } from './bag.service';
import { Get } from '@nestjs/common';


@Controller('bag')
export class BagController {
  constructor(private bagService: BagService) {}
   
  @Get('/')
  async getBag() {
    return this.bagService.getAllBagItems();
  }
  
  /*@Put('/')
  async updateCartItem(@Body() updateCartItemDto: EditCartItem) {
    return this.cartService.updateItemInCart(updateCartItemDto);
  }*/
}
