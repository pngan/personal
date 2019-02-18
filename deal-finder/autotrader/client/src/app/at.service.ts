import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IFieldValues, IFieldValue, QueryParams } from '../../../at-shared/dto/at-dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AtService {

  atBaseUrl = 'http://localhost:3000/at';
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

  searchVehicles(queryParams: QueryParams): Observable<string> {
    const headersRequest = {
      'Content-Type': 'application/json'
    };
    return this.http.post<string>(`${this.atBaseUrl}/vehicles`, queryParams, { headers: headersRequest });
  }
}
