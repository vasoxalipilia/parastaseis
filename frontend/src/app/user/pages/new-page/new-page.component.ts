import { Component, OnInit } from '@angular/core';
import { NewPageService } from './new-page.service';
import { CEvent } from '../../interfaces/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
})
export class NewPageComponent implements OnInit {
  events: CEvent[];
  eventsSubscription: Subscription;
  constructor(private newPageService: NewPageService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.newPageService.onGetEvents().subscribe({
      next: (response) => {
        this.events = response.events;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
