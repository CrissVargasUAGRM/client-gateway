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
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @UseGuards( AuthGuard )
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send(
      { cmd: 'create-product' },
      createProductDto,
    );
  }

  @UseGuards( AuthGuard )
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send(
      { cmd: 'find-products' },
      paginationDto,
    );
  }

  @UseGuards( AuthGuard )
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
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete-product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards( AuthGuard )
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
