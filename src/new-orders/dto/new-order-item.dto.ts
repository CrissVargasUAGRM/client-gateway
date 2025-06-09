import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class NewOrderItemDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 1, description: 'The ID of the product' })
  productId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 2, description: 'The quantity of the product' })
  quantity: number;

  @IsNumber()
  @ApiProperty({ example: 19.99, description: 'The price of the product' })
  price: number;
}