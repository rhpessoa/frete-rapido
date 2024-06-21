import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoinValue } from '../interfaces/coin-value.interface';

@Injectable({
  providedIn: 'root'
})
export class GetCoinsValueService {
  private baseUrl = 'https://economia.awesomeapi.com.br';
  private coinsDataSubject = new Subject<CoinValue[]>();
  coinsData$: Observable<CoinValue[]> = this.coinsDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCoinValue(coin: string, quantity: number): Observable<CoinValue[]> {
    const url = `${this.baseUrl}/${coin}/${quantity}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        return Object.values(response) as CoinValue[];
      })
    );
  }
}
