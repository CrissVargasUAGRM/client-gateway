import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.client.send('createPayment', createPaymentDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  /*@Get()
  findAll() {
    return this.client.send('findAllOrders');
  }*/

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    this.client.send('findPaymentById', id);
  }*/
}
