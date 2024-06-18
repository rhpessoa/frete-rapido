import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoinValue } from '../interfaces/coin-value.interface'; 

@Injectable({
  providedIn: 'root'
})
//Tente fazer a requisição se não conseguir tente novamente. a fazer
export class GetCoinsValueService {
  private baseUrl = 'https://economia.awesomeapi.com.br/json/last';
  private coinsDataSubject = new Subject<CoinValue[]>(); 
  coinsData$: Observable<CoinValue[]> = this.coinsDataSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  getCoinsValue(coins: string[]): void {
    console.log("Sou as moedas", coins)
    const coinsParam = coins.join(',');
    const url = `${this.baseUrl}/${coinsParam}`;

    this.http.get<any>(url).pipe(
      map(response => {
        return Object.values(response) as CoinValue[];
      })
    ).subscribe({
      next: (data) => {
        this.coinsDataSubject.next(data);
      },
      error: (error) => {
        console.error('Erro ao obter dados das moedas:', error);
      }
    });
  }
}
