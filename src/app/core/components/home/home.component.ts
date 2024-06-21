import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CoinValue } from '../../../shared/interfaces/coin-value.interface'; // Importe a interface necessária
import { Subscription, catchError, forkJoin, of } from 'rxjs';
import { GetCoinsValueService } from '../../../shared/services/get-coins-value.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  coinsData: CoinValue[] = [];
  coins: string[] = ['CAD-BRL', 'ARS-BRL', 'GBP-BRL'];
  private coinsDataSubscription!: Subscription;
  private updateInterval!: any;
  public localStorageCoin: any;
  public needRefetch: boolean = false;
  public noDataFound: boolean = false;
  showLoader = false;
  constructor(
    private coinService: GetCoinsValueService,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(state => {
      this.showLoader = state;
    });
    
    this.fetchAndProcessCoinData();
    this.updateInterval = setInterval(() => {
      this.localStorage.removeItem('allCoinsData')
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
        const coinRequests = this.coins.map(coin =>
            this.coinService.getCoinValue(coin, 1).pipe(
                catchError(error => {
                    const errorToFetch = { isError: true, name: coin };
                    if (error instanceof HttpErrorResponse) {
                        console.error("Error occurred:", error.error);
                        console.error("Status code:", error.status);
                    } else {
                        console.error("An unexpected error occurred:", error);
                    }
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
      this.coinsData = this.localStorageCoin;
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
  this.fetchAndProcessCoinData();
}

public checkNeedReFetch(): void {

    this.localStorageCoin = this.localStorage.getItem('allCoinsData');
    if(this.localStorageCoin === null){
      this.needRefetch = true;
    }
    else if(this.localStorageCoin === "expired") {
      this.needRefetch = true;
    } 
    else if (this.localStorageCoin) {
      this.needRefetch = this.localStorageCoin.some((item: { isError: boolean;}) => item.isError === true);
    }
    else if(this.localStorageCoin.length !== this.coins.length){
      this.needRefetch = true;
    }
    
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
