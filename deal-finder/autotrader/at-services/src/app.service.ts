import { Injectable, HttpService, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { hostname } from 'os';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IFieldValues, IFieldValue, QueryParams, IResultDto } from '../../at-shared/dto/at-dto';
import { json } from 'body-parser';
import * as cheerio from 'cheerio';

class ResultDto implements IResultDto {
  public title: string;
  public year: number;
  public price: number;
  public mileage: number;
  public url: string;
  public image: string;
  public nominalPrice: number;
  public discount: number;
}

@Injectable()
export class AppService {

  private results: IResultDto[] = new Array<IResultDto>();
  baseUrl = 'https://www.autotrader.co.nz/search-fields/listing';
  constructor(private http: HttpService) {}

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
  async vehicles(queryParams: QueryParams): Promise<IResultDto[]> {
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
    this.results = new Array<IResultDto>();
    const res = await this.http.get(url,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': 'selectedPageSize=500',
        },
      }).toPromise();
    const $ = cheerio.load(res.data);
    const item = [];
    $('.list-item').each((i, e) => {
      const priceElem = $('p[class="price"]', e);
      let price = $(priceElem).text();
      if (price.startsWith('\$') === false)
        return true;
      const titleStrElem = $('p[class="title"]', e);
      const title = $(titleStrElem).text();
      const yearStr = title.slice(0, 4);
      const year = +yearStr;
      if (Number.isNaN(year) || year < 1900 || year > 2100)
        return true;

      const urlFragment = $('a[href]', titleStrElem).attr('href');

      let image = $('a[class=thumbnail] > img[class=lazyload]', e).attr('data-original');

      let mileage = $('ul[class="features"]', e).children().first().text();
      if (mileage.endsWith('km') === false)
        return true;

      price = price.replace(/\D/g, '');
      mileage = mileage.replace(/\D/g, '');

      const re = new RegExp('\/\/(.*)\:');
      const matches = re.exec(image);
      if (matches != null) {
        image = matches[1];
      }
      //Logger.log(`Item: ${title}, ${yearStr}, ${price}, ${mileage}, ${urlFragment}, ${image}`);

      const result1 = new ResultDto();
      result1.title = title;
      result1.year = +yearStr;
      result1.price = +price;
      result1.mileage = +mileage;
      result1.url = urlFragment;
      result1.image = image;

      this.results.push(result1);
    });
    return this.results;
  }
  ping(): string {
    return `${moment().format()}: ${hostname()}`;
  }
}
