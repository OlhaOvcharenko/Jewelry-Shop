import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Get, Post, Body } from '@nestjs/common';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { BagService } from 'src/bag/bag.service';
import { AddItemToBagDTO } from 'src/bag/dto/addItemToBag.dto';



@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService,
    private cartService: BagService) {}

  @Get('/')
  async getAll() {
    return this.productsService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Post('/:id')
  async addToCart(@Body() addedProductData: AddItemToBagDTO) {
    await this.cartService.addItemToCart(addedProductData);
  }


}
