import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket } from '../interfaces/Ticket.interface';
const BACKEND_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class ReservationPageService {
  constructor(private httpClient: HttpClient) {}

  updateTicket(event: string, ticket: Ticket) {
    return this.httpClient.put<any>(
      `${BACKEND_URL}/event/ticket/${event}`,
      { ticket },
      {
        withCredentials: true,
      }
    );
  }
}
