import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @ApiProperty({example: 'Product Name', description: 'The name of the product'})
  public name: string;

  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @Min(0)
  @Type(() => Number )
  @ApiProperty({example: 19.99, description: 'The price of the product'})
  public price: number;

}
