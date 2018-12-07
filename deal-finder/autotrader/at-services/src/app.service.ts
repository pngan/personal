import { Injectable } from '@nestjs/common';
import { hostname } from 'os';
import * as moment from 'moment';

@Injectable()
export class AppService {
  make(): string {
    return 'make';
  }
  model(): string {
    return 'model';
  }
  searchParams(): string {
    return 'searchParams';
  }
  vehicles(): string {
    return 'vehicles';
  }
  ping(): string {
    return `${moment().format()}: ${hostname()}`;
  }
}
