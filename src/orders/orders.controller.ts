import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { session } from 'passport';

@Controller('order')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get('/')
    async getAll() {
      return this.ordersService.getAll();
    }

    @Post('/')
    create(@Body() orderData: CreateOrderDTO, sessionId: string) {
      return this.ordersService.createOrder(orderData, sessionId);
    }

}
