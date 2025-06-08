import { PartialType } from '@nestjs/swagger';
import { CreateNewOrderDto } from './create-new-order.dto';

export class UpdateNewOrderDto extends PartialType(CreateNewOrderDto) {}
