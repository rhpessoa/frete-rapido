import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinValue } from '../../../shared/interfaces/coin-value.interface'; // Importe a interface necessária
import { Subscription } from 'rxjs';
import { GetCoinsValueService } from '../../../shared/services/get-coins-value.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  coinsData: CoinValue[] = [];
  private coinsDataSubscription!: Subscription;
  private updateInterval!: any;

  constructor(
    private coinsService: GetCoinsValueService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.fetchAndProcessCoinData();

    
    this.updateInterval = setInterval(() => {
      this.localStorage.removeItem('allCoinsData')
      this.fetchAndProcessCoinData();
    }, 180000);
  }

  ngOnDestroy(): void {
    if (this.coinsDataSubscription) {
      this.coinsDataSubscription.unsubscribe();
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private fetchAndProcessCoinData(): void {
    const coins = ['CAD-BRL', 'ARS-BRL', 'GBP-BRL'];
    let localStorageCoin = this.localStorage.getItem('allCoinsData');
    
    if(localStorageCoin == null) {
      this.coinsService.getCoinsValue(coins);
      this.coinsDataSubscription = this.coinsService.coinsData$.subscribe({
        next: (data) => {
          this.coinsData = data;
          this.processCoinsData();
          this.dealingWithLocalStorage();
        },
        error: (error) => {
          console.error('Erro ao receber dados das moedas:', error);
        }
      });
    } else {
      this.coinsData = localStorageCoin;
      this.processCoinsData();
      this.dealingWithLocalStorage();
    }
  }

  private processCoinsData(): void {
    this.coinsData.forEach(coin => {
      coin.name = this.splitCoinName(coin.name);
    });
  }

  private dealingWithLocalStorage(): void {
    this.localStorage.setItem('allCoinsData', this.coinsData);
  }

  private splitCoinName(coinName: string): string {
    return coinName.split('/')[0].trim();
  }
}
