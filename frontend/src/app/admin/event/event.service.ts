import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Ticket } from 'src/app/user/interfaces/Ticket.interface';
import { CEvent } from 'src/app/user/interfaces/event.interface';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {}

  onGetEvents(category: string) {
    return this.httpClient
      .get<any>(`${BACKEND_URL}/event/${category}`, {
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

  onSubmitTicket(ticket: Ticket) {
    // let headers = new Headers();
    // /** No need to include Content-Type in Angular 4 */
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    return this.httpClient
      .post<any>(`${BACKEND_URL}/event/ticket`, ticket, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          // inform the observers that the user's account information are now available
          // inform observers about account info availability
          // this.accountService.onUpdateAccount();
        })
      )
      .pipe(
        map((fileData) => {
          return fileData;
        })
      );
  }

  onSubmitEvent(event: any) {
    const {
      title,
      availableTickets,
      category,
      url,
      description,
      date,
      location,
      coverImage,
      simpleImage,
    } = event;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('availableTickets', availableTickets);
    formData.append('category', category);
    formData.append('url', url);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);

    formData.append('files', coverImage as File, `cover_${coverImage.name}`);
    formData.append('files', simpleImage as File, `simple_${simpleImage.name}`);

    // let headers = new Headers();
    // /** No need to include Content-Type in Angular 4 */
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    return this.httpClient
      .post<any>(`${BACKEND_URL}/event`, formData, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          // inform the observers that the user's account information are now available
          // inform observers about account info availability
          // this.accountService.onUpdateAccount();
        })
      )
      .pipe(
        map((fileData) => {
          return fileData;
        })
      );
  }
}
