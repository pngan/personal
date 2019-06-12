import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IFieldValues, IFieldValue, QueryParams, IResultDto } from '../../../at-shared/dto/at-dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AtService {

  atBaseUrl = 'https://deal-finder-service.herokuapp.com/at';
  constructor(private http: HttpClient) { }

  getMakes():  Observable<IFieldValues[]> {
    return this.http.get<IFieldValues[]>(`${this.atBaseUrl}/makes`);
  }

  getMenusForMake(make: string):  Observable<IFieldValues[]> {
    return this.http.get<IFieldValues[]>(`${this.atBaseUrl}/menusForMake/${make}`);
  }

  getMenusForModel(make: string, model: string):  Observable<IFieldValues[]> {
    return this.http.get<IFieldValues[]>(`${this.atBaseUrl}/menusForModel/${make}/${model}`);
  }

  searchVehicles(queryParams: QueryParams): Observable<IResultDto[]> {
    const headersRequest = {
      'Content-Type': 'application/json'
    };
    return this.http.post<IResultDto[]>(`${this.atBaseUrl}/vehicles`, queryParams, { headers: headersRequest });
  }
}
