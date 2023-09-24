import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendedComponent } from './recommended.component';
import { MultiItemCarouselModule } from '../../shared/multi-item-carousel/multi-item-carousel.module';

@NgModule({
  declarations: [RecommendedComponent],
  imports: [CommonModule, MultiItemCarouselModule],
  exports: [RecommendedComponent],
})
export class RecommendedModule {}
