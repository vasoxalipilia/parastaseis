import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  setCookie(name: string, value: string, expirationDays: number) {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  getAll(): string[] | null {
    const cookies = document.cookie.split('; ');
    // for (const cookie of cookies) {
    //   const [cookieName, cookieValue] = cookie.split('=');
    // }
    return cookies;
  }

  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }
}
