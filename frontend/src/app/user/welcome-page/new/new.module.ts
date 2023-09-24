import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { MultiItemCarouselModule } from '../../shared/multi-item-carousel/multi-item-carousel.module';

@NgModule({
  declarations: [NewComponent],
  imports: [CommonModule, MultiItemCarouselModule],
  exports: [NewComponent],
})
export class NewModule {}
