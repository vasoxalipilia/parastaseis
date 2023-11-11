import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { HeroTextModule } from './hero-text/hero-text.module';
import { CustomCarouselModule } from '../../shared/custom-carousel/custom-carousel.module';

@NgModule({
  declarations: [HeroComponent],
  imports: [CommonModule, HeroTextModule, CustomCarouselModule],
  exports: [HeroComponent],
})
export class HeroModule {}
