import { Component, OnInit } from '@angular/core';
import { Ticket } from '../interfaces/Ticket.interface';
import { CEvent } from '../interfaces/event.interface';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss'],
})
export class ReservationPageComponent implements OnInit {
  event: CEvent;
  ticket: Ticket;
  data: { event: CEvent; ticket: Ticket };

  constructor() {}

  ngOnInit() {
    this.data = history.state?.data;
    this.event = this.data.event;
    this.ticket = this.data.ticket;
  }
}
