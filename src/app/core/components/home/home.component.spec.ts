// home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GetCoinsValueService } from '../../../shared/services/get-coins-value.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { AlertService } from '../../../shared/services/alert.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let getCoinsValueService: GetCoinsValueService;
  let localStorageService: LocalStorageService;
  let loaderService: LoaderService;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        GetCoinsValueService,
        LocalStorageService,
        LoaderService,
        AlertService
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    getCoinsValueService = TestBed.inject(GetCoinsValueService);
    localStorageService = TestBed.inject(LocalStorageService);
    loaderService = TestBed.inject(LoaderService);
    alertService = TestBed.inject(AlertService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check need refetch', () => {
    const localStorageCoins = [
      { code: 'CAD-BRL', name: 'Dólar Canadense', high: 10, low: 5, isError: true },
      { code: 'ARS-BRL', name: 'Peso Argentino', high: 20, low: 10,isError: false },
      { code: 'GBP-BRL', name: 'Libra Esterlina', high: 30, low: 15,isError: false, }
    ];
    spyOn(localStorageService, 'getItem').and.returnValue(localStorageCoins);
    component.checkNeedReFetch();
    expect(component.needRefetch).toBe(true);
  });
});