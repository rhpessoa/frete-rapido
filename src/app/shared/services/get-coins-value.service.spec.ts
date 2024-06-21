import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetCoinsValueService } from './get-coins-value.service';
import { CoinValue } from '../interfaces/coin-value.interface';

describe('GetCoinsValueService', () => {
  let service: GetCoinsValueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetCoinsValueService]
    });
    service = TestBed.inject(GetCoinsValueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return coin values', () => {
    const mockCoinValueResponse: any[] = [
      {
        code: 'BTC',
        name: 'Bitcoin',
        high: 61000,
        low: 59000,
        varBid: 1000,
        pctChange: 1.5,
        bid: 60000,
        ask: 61000,
        timestamp: '1624896345000',
        create_date: '2023-06-28 15:30:00',
        isError: false
      }
    ];

    const mockCoin = 'BTC-BRL';
    const mockQuantity = 1;
    const expectedCoinValue: CoinValue[] = [
      {
        code: 'BTC',
        name: 'Bitcoin',
        high: 61000,
        low: 59000,
        varBid: 1000,
        pctChange: 1.5,
        bid: 60000,
        ask: 61000,
        timestamp: '1624896345000',
        create_date: '2023-06-28 15:30:00',
        isError: false
      }
    ];

    service.getCoinValue(mockCoin, mockQuantity).subscribe((coinsData: CoinValue[]) => {
      expect(coinsData.length).toEqual(expectedCoinValue.length);

      const expectedCoin = expectedCoinValue[0];

      expect(coinsData[0].code).toEqual(expectedCoin.code);
      expect(coinsData[0].name).toEqual(expectedCoin.name);
      expect(coinsData[0].high).toBeDefined();
      expect(coinsData[0].high).toEqual(expectedCoin.high);
      expect(coinsData[0].low).toBeDefined();
      expect(coinsData[0].low).toEqual(expectedCoin.low);
      expect(coinsData[0].varBid).toBeDefined();
      expect(coinsData[0].varBid).toEqual(expectedCoin.varBid);
      expect(coinsData[0].pctChange).toBeDefined();
      expect(coinsData[0].pctChange).toEqual(expectedCoin.pctChange);
      expect(coinsData[0].bid).toBeDefined();
      expect(coinsData[0].bid).toEqual(expectedCoin.bid);
      expect(coinsData[0].ask).toBeDefined();
      expect(coinsData[0].ask).toEqual(expectedCoin.ask);
      expect(coinsData[0].timestamp).toEqual(expectedCoin.timestamp);
      expect(coinsData[0].create_date).toEqual(expectedCoin.create_date);
      expect(coinsData[0].isError).toEqual(expectedCoin.isError);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${mockCoin}/${mockQuantity}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCoinValueResponse);
  });

  it('should handle HTTP error', () => {
    const mockCoin = 'BTC-BRL';
    const mockQuantity = 1;

    service.getCoinValue(mockCoin, mockQuantity).subscribe(
      () => fail('Expected error, but got no error'),
      (error: any) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(`${service.baseUrl}/${mockCoin}/${mockQuantity}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'), { status: 500 });
  });
});
