import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatreComponent } from './theatre.component';
import { MultiItemCarouselModule } from '../../shared/multi-item-carousel/multi-item-carousel.module';

@NgModule({
  declarations: [TheatreComponent],
  imports: [CommonModule, MultiItemCarouselModule],
  exports: [TheatreComponent],
})
export class TheatreModule {}
