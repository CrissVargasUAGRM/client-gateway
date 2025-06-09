import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Put } from '@nestjs/common';
import { CreateNewOrderDto } from './dto/create-new-order.dto';
import { UpdateNewOrderDto } from './dto/update-new-order.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('new-orders')
export class NewOrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @UseGuards( AuthGuard )
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @Post()
  create(@Body() createNewOrderDto: CreateNewOrderDto) {
    return this.client.send('createNewOrder', createNewOrderDto);
  }

  @UseGuards( AuthGuard )
  @ApiOperation({ summary: 'Update data by Order' })
  @ApiResponse({ status: 200, description: 'The order data has been successfully updated.' })
  @Patch(':id')
  changeDataNewOrder(
    @Param('id') id: string,
    @Body() updateNewOrderDto: UpdateNewOrderDto
  ){
    return this.client.send('updateNewOrderData', {newOrderId: id, ...updateNewOrderDto});
  }
}
