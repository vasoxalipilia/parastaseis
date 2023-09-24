import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CEvent } from '../../interfaces/event.interface';

const BACKEND_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class NewPageService {
  constructor(private httpClient: HttpClient) {}

  onGetEvents() {
    return this.httpClient
      .get<any>(`${BACKEND_URL}/event/New`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          response.events.forEach((event: CEvent) => {
            event.coverImage = `${BACKEND_URL.replace(
              '/api',
              ''
            )}/${event.coverImage.replace('static/', '')}`;
            event.simpleImage = `${BACKEND_URL.replace(
              '/api',
              ''
            )}/${event.simpleImage.replace('static/', '')}`;
          });
          return response;
        })
      );
  }

  onGetTickets(eventId: string) {
    return this.httpClient.get<any>(`${BACKEND_URL}/event/ticket/${eventId}`, {
      withCredentials: true,
    });
  }
}
