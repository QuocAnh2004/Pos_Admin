import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Body() dto: CheckoutDto) {
    return this.ordersService.checkout(dto);
  }
}
