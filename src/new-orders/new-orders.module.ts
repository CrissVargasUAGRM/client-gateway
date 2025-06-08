import { Module } from '@nestjs/common';
import { NewOrdersController } from './new-orders.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [NewOrdersController],
  providers: [],
  imports: [NatsModule],
})
export class NewOrdersModule {}
