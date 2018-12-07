import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('at')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('ping')
  ping(): string {
    return this.appService.ping();
  }

  // Test using:
  // curl -s http://localhost:3000/at/makes
  @Get('makes')
  async getMake(): Promise<string> {
    return await this.appService.make();
  }

  @Get('models')
  getModel(): string {
    return this.appService.model();
  }

  @Get('searchParams')
  getSearchParams(): string {
    return this.appService.searchParams();
  }

  @Get('vehicles')
  getVehicles(): string {
    return this.appService.vehicles();
  }
}