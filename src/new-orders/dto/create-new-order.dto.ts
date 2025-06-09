import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { NewOrderItemDto } from "./new-order-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewOrderDto {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'The ID of the user placing the order' })
    userId: number;

    @IsNumber()
    @ApiProperty({ example: 1, description: 'The ID of the client associated with the order' })
    clientId: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => NewOrderItemDto)
    @ApiProperty({type: [NewOrderItemDto], description: 'List of items in the order'})
    details: NewOrderItemDto[];
}
