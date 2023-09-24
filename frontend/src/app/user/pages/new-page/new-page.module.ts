import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPageComponent } from './new-page.component';
import { HeaderModule } from '../../header/header.module';
import { CardListModule } from '../../shared/card-list/card-list.module';
import { FooterModule } from '../../footer/footer.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { NewPageRoutingModule } from './new-page-routing.module';

@NgModule({
  declarations: [NewPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    CardListModule,
    FooterModule,
    BreadcrumbModule,
    NewPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: NewPageComponent,
      },
    ]),
  ],
})
export class NewPageModule {}
