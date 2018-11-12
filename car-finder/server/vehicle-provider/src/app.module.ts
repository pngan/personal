import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutotraderController } from './autotrader/autotrader.controller';
import { AutotraderService } from './autotrader/autotrader.service';

@Module({
  imports: [],
  controllers: [AppController, AutotraderController],
  providers: [AppService, AutotraderService],
})
export class AppModule {}
