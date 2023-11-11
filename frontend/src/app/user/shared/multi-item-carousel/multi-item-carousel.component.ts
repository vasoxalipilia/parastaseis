import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CEvent } from '../../interfaces/event.interface';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.scss'],
})
export class MultiItemCarouselComponent {
  @Input() events: CEvent[];
  @Input() title: { first: string; secondary: string };

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit() {}

  navigateToLink(item: any) {
    this.router.navigate([`${item.url}`], {
      state: { data: { event: item } },
    });
  }

  scroll(direction: number) {
    const cardContainer =
      this.elementRef.nativeElement.querySelector('.carousel .cards');

    if (cardContainer) {
      const cardWidth = cardContainer.clientWidth;
      cardContainer.scrollLeft += cardWidth * direction;
    }
  }
}
