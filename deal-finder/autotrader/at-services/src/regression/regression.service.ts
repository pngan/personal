import { Injectable } from '@nestjs/common';
import { IResultDto } from '../../../at-shared/dto/at-dto';
import * as regression from 'regression';
@Injectable()
export class RegressionService {
  CalculateDiscount(vehicles: IResultDto[]): IResultDto[]  {
    const data = new Array<Array<number>>();
    vehicles.forEach(v => {
      data.push([v.year, v.price]);
    });

    const reg = regression.linear(data);
    const m: number = reg.equation[0];
    const c: number = reg.equation[1];

    vehicles.forEach(v => {
      v.nominalPrice = m * v.year + c;
      const diff = v.nominalPrice - v.price;
      v.discount = diff / v.nominalPrice;
    });

    return vehicles;
  }
}
