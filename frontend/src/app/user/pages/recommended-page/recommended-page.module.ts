import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendedPageComponent } from './recommended-page.component';
import { HeaderModule } from '../../header/header.module';
import { CardListModule } from '../../shared/card-list/card-list.module';
import { FooterModule } from '../../footer/footer.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { RecommededPageRoutingModule } from './recommended-page-routing.module';

@NgModule({
  declarations: [RecommendedPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    CardListModule,
    FooterModule,
    BreadcrumbModule,
    RecommededPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: RecommendedPageComponent,
      },
    ]),
  ],
})
export class RecommendedPageModule {}
