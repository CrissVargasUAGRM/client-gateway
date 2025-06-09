import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { ApiProperty } from '@nestjs/swagger';


export class OrderPaginationDto extends PaginationDto {


  @IsOptional()
  @IsEnum( OrderStatusList, {
    message: `Valid status are ${ OrderStatusList }`
  })
  @ApiProperty({
    enum: OrderStatusList,
    description: 'Filter orders by status',
    required: false,
  })
  status: OrderStatus;


}