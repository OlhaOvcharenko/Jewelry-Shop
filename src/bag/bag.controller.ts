import { Controller } from '@nestjs/common';
import { BagService } from './bag.service';
import { Get, Delete } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
@Controller('bag')
export class BagController {
  constructor(private bagService: BagService) {}
   
  @Get('/')
  async getBagItems() {
    return this.bagService.getAllBagItems();
  }
  
  @Delete('/')
  async deleteById(@Body('id', new ParseUUIDPipe()) id: string) {
    await this.bagService.deleteById(id);
    return { success: true };
  }


  /*@Put('/')
  async updateCartItem(@Body() updateCartItemDto: EditCartItem) {
    return this.cartService.updateItemInCart(updateCartItemDto);
  }*/
}
