import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { hostname } from 'os';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IFieldValues, IFieldValue } from './dto/at-dto';

@Injectable()
export class AppService {
  constructor(private http: HttpService){}

// Converting json to class
// https://stackoverflow.com/questions/43894565/cast-object-to-interface-in-typescript
  async make(): Promise<any> {
    return await this.http.get('https://www.autotrader.co.nz/search-fields/listing?searchterm=a,,,,,,',
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }).pipe(map((res) => {

    const fieldValueSet: IFieldValues[] = res.data;
    return fieldValueSet.filter(x => x.FieldName === 'make');
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
