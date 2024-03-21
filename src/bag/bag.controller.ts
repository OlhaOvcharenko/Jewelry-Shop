import { Controller, Put } from '@nestjs/common';
import { BagService } from './bag.service';
import { Get, Delete, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { EditBagItem } from './dto/editBagItem.dto';
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


  @Put('/')
  async submit(@Body() submitBagItemDto: EditBagItem) {
    return this.bagService.submitItemsInBag(submitBagItemDto);
  }
}
