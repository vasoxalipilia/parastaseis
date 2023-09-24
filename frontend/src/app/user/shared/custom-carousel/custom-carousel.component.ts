import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      state(
        'slide-in',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('void => slide-in', [
        style({ transform: 'translateX(-100%)' }),
        animate(
          '800ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'translateX(0)' })
        ),
      ]),
      transition('slide-in => void', [
        animate(
          '800ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],

  // animations: [
  //   trigger('carouselAnimation', [
  //     state(
  //       'slide-in',
  //       style({
  //         transform: 'translateX(0)',
  //       })
  //     ),
  //     transition('void => slide-in', [
  //       style({ transform: 'translateX(-100%)' }),
  //       animate('500ms ease-in'),
  //     ]),
  //     transition('slide-in => void', [
  //       animate('500ms ease-out', style({ transform: 'translateX(100%)' })),
  //     ]),
  //   ]),
  // ],
  // animations: [
  //   trigger('carouselAnimation', [
  //     transition('void => *', [
  //       style({ opacity: 0 }),
  //       animate('300ms', style({ opacity: 1 })),
  //     ]),
  //     transition('* => void', [animate('300ms', style({ opacity: 0 }))]),
  //   ]),
  // ],
})
export class CustomCarouselComponent {
  @Input() slides: string[] = [];
  intervalId: NodeJS.Timer | null = null;
  isLoading = false;
  currentSlide = 0;
  carouselSlidesSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.preloadImages();

    this.slideShow();
  }

  ngOnDestroy(): void {
    // this.carouselSlidesSubscription.unsubscribe();
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  slideShow() {
    this.intervalId = setInterval(() => {
      this.onNextClick();
      this.preloadNextImage(); // Preload the next image
    }, 3000);
  }

  preloadNextImage() {
    const nextSlide = (this.currentSlide + 1) % this.slides.length;
    const image = new Image();
    image.src = this.slides[nextSlide];
  }

  // onNextClick() {
  //   const next = this.currentSlide + 1;
  //   this.currentSlide = next === this.slides.length ? 0 : next;
  // }

  // slideShow() {
  //   this.intervalId = setInterval(() => {
  //     this.onNextClick();
  //   }, 3000);
  //   // setInterval(() => {
  //   //   this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  //   // }, 3000);
  // }

  stopSlideShow() {
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }

  // if it has to be get by the backend server
  preloadImages() {
    this.isLoading = true;
    // this.carouselSlidesSubscription = this.customCarouselService
    //   .getCarouselSlides()
    //   .subscribe((response) => {
    //     // console.log(response);
    //     this.slides = response.carouselSlides;
    //     this.dynamicDatabase.slides = this.slides;
    //     this.isLoading = false;
    //   });
  }
}
