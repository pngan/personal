import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IFieldValues, IFieldValue } from '../../../at-shared/dto/at-dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AtService {

  atUrl = 'http://localhost:3000/at/makes';
  constructor(private http: HttpClient) { }

  getMakes():  Observable<IFieldValues[]> {
    return this.http.get<IFieldValues[]>(this.atUrl);
  }
}
