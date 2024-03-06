import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Get } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async getAll() {
    return this.productsService.getAll();
  }
}
