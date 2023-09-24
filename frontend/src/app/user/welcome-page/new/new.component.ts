import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CEvent } from '../../interfaces/event.interface';
import { NewPageService } from '../../pages/new-page/new-page.service';

@Component({
  selector: 'app-news',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  title = {
    first: 'Νέα',
    secondary: 'Οι πιο φρέσκες προσθήκες',
  };

  eventsSubscription: Subscription;
  events: CEvent[];

  constructor(private newPageService: NewPageService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.newPageService.onGetEvents().subscribe({
      next: (response) => {
        this.events = response.events;
      },
      error: (error) => {
        console.error(error.message.message);
      },
    });
  }

  // events = [
  //   {
  //     title: 'Card 1',
  //     category: 'Category 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: 'assets/images/1.jpg',
  //     header_image: 'assets/images/header/1.jpg',
  //     url: '/theatre/reservation',
  //     date: 'July 15-16, 2023',
  //     location: 'Example Venue',
  //   },
  //   {
  //     title: 'Card 2',
  //     category: 'Category 2',
  //     description:
  //       'Nulla gravida, sem et pretium imperdiet, lectus urna dignissim enim.',
  //     image: 'assets/images/2.jpg',
  //     header_image: 'assets/images/header/2.jpg',
  //     url: '/theatre/reservation',
  //     date: 'July 30, 2023',
  //     location: 'Example Venue',
  //   },
  //   {
  //     title: 'Card 3',
  //     category: 'Category 3',
  //     description:
  //       'Nulla gravida, sem et pretium imperdiet, lectus urna dignissim enim.',
  //     image: 'assets/images/3.jpg',
  //     header_image: 'assets/images/header/3.jpg',
  //     url: '/theatre/reservation',
  //     date: 'July 30, 2023',
  //     location: 'Example Venue',
  //   },
  //   {
  //     title: 'Card 4',
  //     category: 'Category 4',
  //     description:
  //       'Nulla gravida, sem et pretium imperdiet, lectus urna dignissim enim.',
  //     image: 'assets/images/4.jpg',
  //     header_image: 'assets/images/header/4.jpg',
  //     url: '/theatre/reservation',
  //     date: 'July 30, 2023',
  //     location: 'Example Venue',
  //   },
  //   {
  //     title: 'Card 5',
  //     category: 'Category 5',
  //     description:
  //       'Nulla gravida, sem et pretium imperdiet, lectus urna dignissim enim.',
  //     image: 'assets/images/5.jpg',
  //     header_image: 'assets/images/header/5.jpg',
  //     url: '/theatre/reservation',
  //     date: 'July 30, 2023',
  //     location: 'Example Venue',
  //   },
  //   {
  //     title: 'Card 6',
  //     category: 'Category 6',
  //     description:
  //       'Nulla gravida, sem et pretium imperdiet, lectus urna dignissim enim.',
  //     image: 'assets/images/6.jpg',
  //     header_image: 'assets/images/header/6.jpg',
  //     url: '/theatre/reservation',
  //     date: 'July 30, 2023',
  //     location: 'Example Venue',
  //   },
  //   // Add more items as needed
  // ];
}
