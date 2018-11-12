import { Get, Controller } from '@nestjs/common';
import { AutotraderService } from 'autotrader/autotrader.service';

@Controller('autotrader')
export class AutotraderController {
    constructor(private readonly autotraderService: AutotraderService) {}

  @Get()
  root(): string {
    return this.autotraderService.ping();
  }
}
