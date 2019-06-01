import { Get, Post, Controller, Param, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { json } from 'body-parser';
import { QueryParams, IResultDto } from '../../at-shared/dto/at-dto';
import { RegressionService } from './regression/regression.service';

@Controller('at')
export class AppController {
  constructor(private readonly appService: AppService, private readonly regressionService: RegressionService) { }

  @Get('ping')
  ping(): string {
    return this.appService.ping();
  }

  // Test using:
  // curl -s http://localhost:3000/at/makes
  @Get('makes')
  async getMake(): Promise<any> {
    return await this.appService.make();
  }

  @Get('menusForMake/:make')
  menusForMake(@Param('make') make: string): Promise<any>  {
    return this.appService.menusForMake(make);
  }

  @Get('menusForModel/:make/:model')
  menusForModel(@Param('make') make: string, @Param('model') model: string): Promise<any>  {
    return this.appService.menusForModel(make, model);
  }

  @Get('searchParams')
  getSearchParams(): string {
    return this.appService.searchParams();
  }

  @Post('vehicles')
  async getVehicles(@Body() queryParams: any): Promise<any>  {
    let vehicles = await this.appService.vehicles(queryParams);
    vehicles.subscribe(
      vehics => {
        const vs = vehics as IResultDto[];
        const vechiclesWithDiscount = this.regressionService.CalculateDiscount(vs);
        vechiclesWithDiscount.forEach(v => {
          Logger.log(v);
        });
      });
    return vehicles;
  }
}