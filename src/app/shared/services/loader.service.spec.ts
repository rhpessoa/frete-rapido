import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loader', () => {
    service.showLoader();
    service.loaderState.subscribe((state: boolean) => {
      expect(state).toEqual(true);
    });
  });

  it('should hide loader', () => {
    service.hideLoader();
    service.loaderState.subscribe((state: boolean) => {
      expect(state).toEqual(false);
    });
  });
});
