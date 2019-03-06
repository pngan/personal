import { Injectable, HttpService, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { hostname } from 'os';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IFieldValues, IFieldValue, QueryParams } from '../../at-shared/dto/at-dto';
import { json } from 'body-parser';
import * as cheerio from 'cheerio';

@Injectable()
export class AppService {
  baseUrl = 'https://www.autotrader.co.nz/search-fields/listing';
  constructor(private http: HttpService) { }

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
  async vehicles(queryParams: QueryParams): Promise<any> {
    Logger.log(`Search for ${JSON.stringify(queryParams)}`);
    let url = 'https://www.autotrader.co.nz/used-cars-for-sale/';
    if (queryParams.make !== undefined)
      url += queryParams.make;
    if (queryParams.model !== undefined)
      url += '-' + queryParams.model;
    if (queryParams.region !== undefined)
      url += '-' + queryParams.region;
    url += `/price-${queryParams.priceLow}-${queryParams.priceHigh}/year-${queryParams.yearLow}-${queryParams.yearHigh}/kms-${queryParams.distLow}-${queryParams.distHigh}`;
    Logger.log(`Url = ${url}`);

    return await this.http.get(url,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': 'selectedPageSize=500',
      },
    }).pipe(map((res) => {
      const $ = cheerio.load(res.data);
      Logger.log(`Url = ${$('p[class=price]').text()}`);

      const item = [];
      $('div .list-item').each((i, e) => {
        const price = $('p[class="price"]', e).text();
        if (price.startsWith('\$') === false)
          return true;
        const yearStr = $('p[class="title"]', e).text().slice(0, 4);
        const year = +yearStr;
        if (Number.isNaN(year) || year < 1900 || year > 2100)
          return true;
        const mileage = $('ul[class="features"]', e).children().first().text();
        if (mileage.endsWith('km') === false)
          return true;
        Logger.log(`Item: ${yearStr}, ${price}, ${mileage}`);
      });

      return JSON.stringify(res.data);
    }));
  }
  ping(): string {
    return `${moment().format()}: ${hostname()}`;
  }
}
