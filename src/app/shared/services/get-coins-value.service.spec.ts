import { TestBed } from '@angular/core/testing';
import { GetCoinsValueService } from './get-coins-value.service';



describe('GetCoinsValueService', () => {
  let service: GetCoinsValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCoinsValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
