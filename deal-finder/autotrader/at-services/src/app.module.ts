import { Module, HttpModule, Logger, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule, Logger],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
