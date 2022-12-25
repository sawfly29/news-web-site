import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setLocalStorageData(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  }

  getLocalStorageData<T = any>(key: string): T | null { // eslint-disable-line
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}
