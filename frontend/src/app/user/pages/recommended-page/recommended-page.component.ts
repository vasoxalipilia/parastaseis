import { Component, OnInit } from '@angular/core';
import { RecommendedPageService } from './recommended-page.service';
import { CEvent } from '../../interfaces/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommended-page',
  templateUrl: './recommended-page.component.html',
  styleUrls: ['./recommended-page.component.scss'],
})
export class RecommendedPageComponent implements OnInit {
  events: CEvent[];
  eventsSubscription: Subscription;
  constructor(private recommendedPageService: RecommendedPageService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.recommendedPageService
      .onGetEvents()
      .subscribe({
        next: (response) => {
          this.events = response.events;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
