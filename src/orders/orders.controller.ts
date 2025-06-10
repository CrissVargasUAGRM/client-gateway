import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNewOrderDto } from './dto/create-new-order.dto';
import { UpdateNewOrderDto } from './dto/update-new-order.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @Post()
  create(@Body() createOrderDto: CreateNewOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all orders with pagination' })
  @ApiResponse({ status: 200, description: 'List of orders' })
  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', orderPaginationDto),
      );
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order details' })
  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all orders by status' })
  @ApiResponse({ status: 200, description: 'List of orders by status' })
  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.client.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Change the status of an order' })
  @ApiResponse({
    status: 200,
    description: 'Order status changed successfully',
  })
  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.client.send('changeOrderStatus', {
        id,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update data by Order' })
  @ApiResponse({
    status: 200,
    description: 'The order data has been successfully updated.',
  })
  @Patch('order/:id')
  changeDataNewOrder(
    @Param('id') id: string,
    @Body() updateNewOrderDto: UpdateNewOrderDto,
  ) {
    return this.client.send('updateNewOrderData', {
      newOrderId: id,
      ...updateNewOrderDto,
    });
  }
}
