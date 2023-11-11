import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { MultiItemCarouselModule } from '../../shared/multi-item-carousel/multi-item-carousel.module';

@NgModule({
  declarations: [MusicComponent],
  imports: [CommonModule, MultiItemCarouselModule],
  exports: [MusicComponent],
})
export class MusicModule {}
