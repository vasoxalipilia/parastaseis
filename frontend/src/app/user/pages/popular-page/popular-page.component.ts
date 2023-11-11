import { Component, OnInit } from '@angular/core';
import { PopularPageService } from './popular-page.service';
import { CEvent } from '../../interfaces/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popular-page',
  templateUrl: './popular-page.component.html',
  styleUrls: ['./popular-page.component.scss'],
})
export class PopularPageComponent implements OnInit {
  events: CEvent[];
  eventsSubscription: Subscription;
  constructor(private popularPageService: PopularPageService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.popularPageService.onGetEvents().subscribe({
      next: (response) => {
        this.events = response.events;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
