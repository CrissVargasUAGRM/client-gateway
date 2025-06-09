import { PartialType } from '@nestjs/swagger';
import { CreateNewOrderDto } from './create-new-order.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateNewOrderDto extends PartialType(CreateNewOrderDto) {

}
