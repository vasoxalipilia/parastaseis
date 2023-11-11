import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class MyticketsService {
  constructor(private httpClient: HttpClient) {}

  onGetTickets(user: any) {
    return this.httpClient.get<any>(`${BACKEND_URL}/user/shipping/${user}`, {
      withCredentials: true,
    });
  }
}
