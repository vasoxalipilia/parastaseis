import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyticketsComponent } from './mytickets.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [MyticketsComponent],
  imports: [
    CommonModule,
    HeaderModule,
    BreadcrumbModule,
    FooterModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MyticketsComponent,
      },
    ]),
  ],
})
export class MyticketsModule {}
