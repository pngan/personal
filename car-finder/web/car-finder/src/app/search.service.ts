import { Injectable } from '@angular/core';
import { SearchParameters, SearchResult } from './root/root.component';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { encodeUriQuery } from '@angular/router/src/url_tree';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getSearchResultsAsync(params: SearchParameters): Promise<any> {

    //let url = 'http://localhost:8080/test';
    let url = 'http://localhost:8080/find?json=';
    url +=  encodeURIComponent( JSON.stringify(params));

    const data = this.httpClient.get( url );
    // const data = this.httpClient.get( url, {responseType: 'text'}  );
    console.log(typeof data);
    return data.toPromise();
  }
}
