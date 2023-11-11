import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header/header.module';
import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { FooterModule } from './footer/footer.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    HeaderModule,
    CommonModule,
    FooterModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UserComponent,
      },
    ]),
    WelcomePageModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
