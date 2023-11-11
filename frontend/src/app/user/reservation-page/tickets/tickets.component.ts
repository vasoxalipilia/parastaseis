import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../interfaces/Ticket.interface';
import { CEvent } from '../../interfaces/event.interface';
import { Subscription } from 'rxjs';
import { TheatrePageService } from '../../pages/theatre-page/theatre-page.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  event: CEvent;
  data: { event: CEvent; ticket: Ticket };
  tickets: Ticket[];
  ticketSubscription: Subscription;

  constructor(
    private theatrePageService: TheatrePageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.data = history.state?.data;
    this.event = this.data.event;

    this.ticketSubscription = this.theatrePageService
      .onGetTickets(this.event._id)
      .subscribe({
        next: (response) => {
          this.tickets = response.tickets;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  buyTicket(event: CEvent, ticket: Ticket) {
    this.router.navigate([`${event.url}/shippingInformation`], {
      state: { data: { event: this.event, ticket } },
    });
  }
}
