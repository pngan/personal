import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { hostname } from 'os';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService){}

// Converting json to class
// https://stackoverflow.com/questions/22875636/how-do-i-cast-a-json-object-to-a-typescript-class
  async make(): Promise<any> {
    return await this.http.get('https://www.autotrader.co.nz/search-fields/listing?searchterm=a,,,,,,',
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }).pipe(map((res) => {
    return res.data;
  }));

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
