import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { RestLoggingMiddleware } from './middleware/rest-logging.middleware';

@Module({
  imports: [],
  controllers: [AppController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RestLoggingMiddleware)
      .forRoutes('/');
  }
}
