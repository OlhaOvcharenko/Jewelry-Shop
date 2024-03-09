import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Post, Get } from '@nestjs/common';

import { Body } from '@nestjs/common';
import { addToCartDTO} from './dto/add-to-cart.dto';

@Controller()
export class CartController {
  constructor(private cartService: CartService) {}
   
  @Get('/cart')
  async getCart() {
    return this.cartService.getAllCartItems();
  }

  @Post('products/:id/add-to-cart')
  async addToCart(@Body() addedProductData: addToCartDTO) {
    await this.cartService.addToCart(addedProductData);
  }
}
