import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCarouselComponent } from './custom-carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CustomCarouselComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [CustomCarouselComponent],
})
export class CustomCarouselModule {}
