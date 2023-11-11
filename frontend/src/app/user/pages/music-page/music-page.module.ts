import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPageComponent } from './music-page.component';
import { HeaderModule } from '../../header/header.module';
import { CardListModule } from '../../shared/card-list/card-list.module';
import { FooterModule } from '../../footer/footer.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { MusicPageRoutingModule } from './music-page-routing.module';

@NgModule({
  declarations: [MusicPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    CardListModule,
    FooterModule,
    BreadcrumbModule,
    MusicPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MusicPageComponent,
      },
    ]),
  ],
})
export class MusicPageModule {}
