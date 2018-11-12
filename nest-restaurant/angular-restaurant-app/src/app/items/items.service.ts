import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  // creates header
  private _authHeader(): Object {
    return {
      headers: new HttpHeaders({ 'authorization': `Bearer ${this.auth.getAccessToken()}`})
    };
  }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/items');
  }

  public postItems(item: Item): Observable<Item> {
    return this.http.post<Item>('http://localhost:3000/items', item, this._authHeader());
  }

  public postToShoppingCart(): Observable<String> {
    return this.http.post<String>('http://localhost:3000/shopping-cart', '', this._authHeader());
  }
}
