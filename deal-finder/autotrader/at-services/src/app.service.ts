import { Injectable } from '@nestjs/common';
import { hostname } from 'os';
import * as moment from 'moment';

@Injectable()
export class AppService {
  ping(): string {
    return `${moment().format()}: ${hostname()}`;
  }
}
