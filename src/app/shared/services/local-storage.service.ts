import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    const now = new Date();
    const expiration = new Date(now.getTime() + 3 * 60000);
    console.log(expiration)
    const item = {
      value: value,
      expiration: expiration.toISOString()
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key: string): any {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const expiration = new Date(item.expiration);
    if (expiration <= new Date()) {
      this.removeItem(key);
      return "expired"
    }
    return item.value;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
