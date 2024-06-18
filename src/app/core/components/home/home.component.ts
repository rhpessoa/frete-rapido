import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinValue } from '../../../shared/interfaces/coin-value.interface'; // Importe a interface necessária
import { Subscription } from 'rxjs';
import { GetCoinsValueService } from '../../../shared/services/get-coins-value.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  coinsData: CoinValue[] = [];
  private coinsDataSubscription!: Subscription;

  constructor(private coinsService: GetCoinsValueService) {}

  ngOnInit(): void {
    const coins = ['CAD-BRL', 'ARS-BRL', 'GBP-BRL'];
    this.coinsService.getCoinsValue(coins);
    this.coinsDataSubscription = this.coinsService.coinsData$.subscribe({
      next: (data) => {
        this.coinsData = data;
        this.processCoinsData();
        console.log('Dados atualizados das moedas:', this.coinsData);
      },
      error: (error) => {
        console.error('Erro ao receber dados das moedas:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.coinsDataSubscription) {
      this.coinsDataSubscription.unsubscribe();
    }
  }

  private processCoinsData(): void {
    this.coinsData.forEach(coin => {
      coin.name = this.splitCoinName(coin.name)
    })
  }

  private splitCoinName(coinName: string): string {
    return coinName.split('/')[0].trim();
  }
}
