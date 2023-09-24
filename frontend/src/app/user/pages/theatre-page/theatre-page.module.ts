import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatrePageComponent } from './theatre-page.component';
import { HeaderModule } from '../../header/header.module';
import { CardListModule } from '../../shared/card-list/card-list.module';
import { FooterModule } from '../../footer/footer.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { TheatrePageRoutingModule } from './theatre-page-routing.module';

@NgModule({
  declarations: [TheatrePageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    CardListModule,
    FooterModule,
    BreadcrumbModule,
    TheatrePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: TheatrePageComponent,
      },
    ]),
  ],
})
export class TheatrePageModule {}
