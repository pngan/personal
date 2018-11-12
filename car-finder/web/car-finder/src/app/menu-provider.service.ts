import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { QueryParameters } from './root/root.component';

interface FieldValue {
  Value: string;
  Display: string;
}
interface Menu {
  FieldName: string;
  FieldValues: FieldValue[];
}


@Injectable({
  providedIn: 'root'
})
export class MenuProviderService {

  constructor(private httpClient: HttpClient) { }

  async getIntialMenuAsync(): Promise<Array<Menu>> {
    const data = await this.httpClient.get<Array<Menu>>(
      'http://localhost:8080/').toPromise();
    // const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
    // const data = await this.httpClient.get<any>(
    //   'http://localhost:8080/', { headers: headers }).toPromise();
    return data;
  }

  async getMenuAsync(queryParameters: QueryParameters): Promise<Array<Menu>> {
    let url = 'http://localhost:8080/';
    if (queryParameters.make) {
      url += `?make=${encodeURIComponent(queryParameters.make)}`;
    }

    if (queryParameters.model) {
      url += `&model=${encodeURIComponent(queryParameters.model)}`;
    }

    if (queryParameters.region) {
      url += `&region=${encodeURIComponent(queryParameters.region)}`;
    }

    if (queryParameters.bodyStyle) {
      url += `&bodyStyle=${encodeURIComponent(queryParameters.bodyStyle)}`;
    }

    if (queryParameters.tranmissionStyle) {
      url += `&tranmissionStyle=${encodeURIComponent(queryParameters.tranmissionStyle)}`;
    }

    const data = await this.httpClient.get<Array<Menu>>(encodeURI(url)).toPromise();
    // const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
    // const data = await this.httpClient.get<any>(
    //   'http://localhost:8080/', { headers: headers }).toPromise();
    return data;
  }

  async getIntialMenu() {
    const data = await this.httpClient.get(
      'http://localhost:8080/');
    // const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
    // const data = await this.httpClient.get<any>(
    //   'http://localhost:8080/', { headers: headers }).toPromise();
    return data;
  }
}
