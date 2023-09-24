import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularComponent } from './popular.component';
import { MultiItemCarouselModule } from '../../shared/multi-item-carousel/multi-item-carousel.module';

@NgModule({
  declarations: [PopularComponent],
  imports: [CommonModule, MultiItemCarouselModule],
  exports: [PopularComponent],
})
export class PopularModule {}
