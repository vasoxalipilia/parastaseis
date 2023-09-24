import { Component, OnInit } from '@angular/core';
import { Ticket } from '../interfaces/Ticket.interface';
import { CEvent } from '../interfaces/event.interface';
import { MyticketsService } from './mytickets.service';
import { Shipping } from '../interfaces/shipping.interface';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.scss'],
})
export class MyticketsComponent implements OnInit {
  tickets: Ticket[];
  userId = localStorage.getItem('userId');
  shippings: Shipping[];

  constructor(private myticketsService: MyticketsService) {}

  ngOnInit(): void {
    // console.log(this.userId);
    this.myticketsService.onGetTickets(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        this.shippings = response.shippings;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
