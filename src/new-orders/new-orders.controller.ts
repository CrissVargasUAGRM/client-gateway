import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateNewOrderDto } from './dto/create-new-order.dto';
import { UpdateNewOrderDto } from './dto/update-new-order.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('new-orders')
export class NewOrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @UseGuards( AuthGuard )
  @Post()
  create(@Body() createNewOrderDto: CreateNewOrderDto) {
    return this.client.send('createNewOrder', createNewOrderDto);
  }
}
