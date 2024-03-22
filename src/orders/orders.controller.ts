import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/createOrder.dto';

@Controller('order')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get('/')
    async getAll() {
      return this.ordersService.getAll();
    }

    @Post('/')
    create(@Body() orderData: CreateOrderDTO) {
      return this.ordersService.createOrder(orderData);
    }

}
