import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get item from local storage', () => {
    const key = 'testKey';
    const value = { test: 'value' };

    service.setItem(key, value);

    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  it('should return null for non-existing item', () => {
    const key = 'nonExistingKey';

    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should remove item from local storage', () => {
    const key = 'testKey';
    const value = { test: 'value' };

    service.setItem(key, value);
    service.removeItem(key);

    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should clear all items from local storage', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const value1 = { test: 'value1' };
    const value2 = { test: 'value2' };

    service.setItem(key1, value1);
    service.setItem(key2, value2);
    service.clear();

    const retrievedValue1 = service.getItem(key1);
    const retrievedValue2 = service.getItem(key2);

    expect(retrievedValue1).toBeNull();
    expect(retrievedValue2).toBeNull();
  });

  it('should handle expiration correctly', fakeAsync(() => {
    const key = 'testKey';
    const value = { test: 'value' };
    service.setItem(key, value);
    tick(180000);
    const retrievedValue = service.getItem(key);
    expect(retrievedValue).toBeNull();
  }));
});
