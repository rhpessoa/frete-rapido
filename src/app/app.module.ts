import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HomeComponent } from './core/components/home/home.component';
import { CardComponent } from './shared/components/card/card.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { GetCoinsValueService } from './shared/services/get-coins-value.service';
import { FormatBidValuePipe } from './shared/pipes/formatBidValuePipe';
import { FormatHourPipe } from './shared/pipes/formatDatePipe';
import { LocalStorageService } from './shared/services/local-storage.service';
import { LoaderService } from './shared/services/loader.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        CardComponent,
        FormatBidValuePipe,
        FormatHourPipe,
        LoaderComponent,
        AlertComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule], providers: [
        GetCoinsValueService,
        LocalStorageService,
        LoaderService,
        AlertService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
