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

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        CardComponent,
        FormatBidValuePipe,
        FormatHourPipe
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule], providers: [
        GetCoinsValueService,
        LocalStorageService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
