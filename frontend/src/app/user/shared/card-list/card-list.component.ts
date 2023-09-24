import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../interfaces/Ticket.interface';
import { CEvent } from '../../interfaces/event.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  @Input() events: CEvent[];

  constructor(private router: Router) {}

  navigateToLink(event: any) {
    this.router.navigate([`${event.url}`], {
      state: { data: { event } },
    });
  }
}
