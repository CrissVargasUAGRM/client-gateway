import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @UseGuards( AuthGuard )
  @ApiOperation({summary: 'Create a new product'})
  @ApiResponse({status: 201, description: 'The product has been successfully created.'})
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send(
      { cmd: 'create-product' },
      createProductDto,
    );
  }

  @UseGuards( AuthGuard )
  @ApiOperation({summary: 'Get all products with pagination'})
  @ApiResponse({status: 200, description: 'List of products'})
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send(
      { cmd: 'find-products' },
      paginationDto,
    );
  }

  @UseGuards( AuthGuard )
  @ApiOperation({summary: 'Get a product by ID'})
  @ApiResponse({status: 200, description: 'Product details'})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find-one-product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // try {

    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' },{ id })
    //   );
    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @UseGuards( AuthGuard )
  @ApiOperation({summary: 'Delete a product by ID'})
  @ApiResponse({status: 200, description: 'Product deleted successfully'})
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete-product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards( AuthGuard )
  @ApiOperation({summary: 'Update a product by ID'})
  @ApiResponse({status: 200, description: 'Product updated successfully'})
  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send(
        { cmd: 'update-product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
