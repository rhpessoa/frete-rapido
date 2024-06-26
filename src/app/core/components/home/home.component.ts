import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CoinValue } from '../../../shared/interfaces/coin-value.interface'; // Importe a interface necessária
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { GetCoinsValueService } from '../../../shared/services/get-coins-value.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { AlertService } from '../../../shared/services/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  coinsData: CoinValue[] = [];
  coins: string[] = ['CAD-BRL', 'ARS-BRL', 'GBP-BRL'];
  public coinsDataSubscription!: Subscription;
  public updateInterval!: any;
  public localStorageCoin: CoinValue[] | null = null;
  public needRefetch: boolean = false;
  showLoader = false;
  constructor(
    private coinService: GetCoinsValueService,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(state => {
      this.showLoader = state;
    });
    
    this.fetchAndProcessCoinData();
    this.updateInterval = setInterval(() => {
      this.coinsData = [];
      this.showLoader = false;
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

public fetchAndProcessCoinData(): void {
  this.loaderService.showLoader();
    this.checkNeedReFetch();
    if (this.needRefetch) {
      this.localStorage.removeItem("allCoinsData")
        const coinRequests = this.coins.map(coin =>
            this.coinService.getCoinValue(coin, 1).pipe(
                catchError(error => {
                    const errorToFetch = { isError: true, name: coin };
                    this.alertService.sendMessage("Houve um error ao atualizar os dados, Por favor tente novamente!");
                    return of([errorToFetch]);
                })
            )
        );
        forkJoin(coinRequests).subscribe({
            next: (responses: (CoinValue | { isError: boolean, name: string })[][]) => {
                responses.forEach(response => {
                    response.forEach(item => {
                        if(item.isError !== true) item.isError = false
                        this.coinsData.push(item);
                    });
                });
                this.checkAndRenameErroredCoins();
                this.processCoinsData();
                this.dealingWithLocalStorage();
                this.hideLoaderWithDelay(1000);         
            },
        });
    }
    else {
      this.coinsData = this.localStorageCoin || [];
      this.processCoinsData();
      this.dealingWithLocalStorage();
      this.hideLoaderWithDelay(1000);
    }
}

//Criado para demonstrar o loading da aplicação ao carregar os dados.
public hideLoaderWithDelay(delay: number) {
  setTimeout(() => {
    this.loaderService.hideLoader();
  }, delay);
}

public checkAndRenameErroredCoins(): void {
  this.coinsData.forEach(coin => {
    if (coin.isError) {
      switch (coin.name) {
        case "CAD-BRL":
          coin.name = "Dólar Canadense";
          break;
        case "ARS-BRL":
          coin.name = "Peso Argentino";
          break;
        case "GBP-BRL":
          coin.name = "Libra Esterlina";
          break;
        default:
          coin.name = "Dado não disponível"
          break;
      }
    }
  });
}

public handleReload(): void {
  this.showLoader = false;
  this.coinsData = [];
  this.fetchAndProcessCoinData();
}

public checkNeedReFetch(): void {
  const localStorageCoins = this.localStorage.getItem('allCoinsData');
  if (localStorageCoins === null || []) {
    this.needRefetch = true;
    return;
  }
  if (localStorageCoins.some((item: { isError: boolean }) => item.isError === true)) {
    this.needRefetch = true;
    return;
  }
  if (localStorageCoins.length !== this.coins.length) {
    this.needRefetch = true;
    return;
  }
  this.needRefetch = false;
}

  public processCoinsData(): void {
    this.coinsData.forEach(coin => {
      coin.name = this.splitCoinName(coin.name!);
    });
  }

  public dealingWithLocalStorage(): void {
    this.localStorage.setItem('allCoinsData', this.coinsData);
  }

  public splitCoinName(coinName: string | undefined): string {
    if (!coinName) {
      return ''; 
    }
    return coinName.split('/')[0].trim();
  }
}



