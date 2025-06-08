import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule,
  ],
})
export class ProductsModule {}
