import { Module, HttpModule, Logger, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegressionService } from './regression/regression.service';

@Module({
  imports: [HttpModule, Logger],
  controllers: [AppController],
  providers: [AppService, RegressionService],
})
export class AppModule {}
