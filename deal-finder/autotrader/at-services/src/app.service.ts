import { Injectable, HttpService, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { hostname } from 'os';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IFieldValues, IFieldValue, QueryParams } from '../../at-shared/dto/at-dto';

@Injectable()
export class AppService {
  baseUrl = 'https://www.autotrader.co.nz/search-fields/listing';
  constructor(private http: HttpService){}

// Converting json to class
// https://stackoverflow.com/questions/43894565/cast-object-to-interface-in-typescript
  async make(): Promise<any> {
    return await this.http.get(`${this.baseUrl}?searchterm=a,,,,,,`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }).pipe(map((res) => {

    const fieldValueSet: IFieldValues[] = res.data;
    return fieldValueSet.filter(x => x.FieldName === 'make');
  }));
  }
  async menusForMake(make: string): Promise<any> {
    Logger.log(`** Make is ${make}`);
    return await this.http.get(`${this.baseUrl}?searchterm=${make},,,,,,`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }).pipe(map((res) => {
    return res.data;
  }));
  }
  async menusForModel(make: string, model: string): Promise<any> {
    Logger.log(`** Make is ${make}, Model is ${model}`);
    return await this.http.get(`${this.baseUrl}?searchterm=${make},${model},,,,,`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }).pipe(map((res) => {
    return res.data;
  }));
  }
  searchParams(): string {
    return 'searchParams';
  }
  vehicles(queryParams: QueryParams): string {
    Logger.log(`Search for ${queryParams}`);
    Logger.log(`Return ${JSON.stringify('hello')}`);
    return JSON.stringify('hello');
  }
  ping(): string {
    return `${moment().format()}: ${hostname()}`;
  }
}
