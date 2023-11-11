import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { NewComponent } from './new/new.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      { path: '', redirectTo: 'new', pathMatch: 'full' },

      {
        path: 'new',
        component: NewComponent,
        pathMatch: 'full',
      },
      {
        path: 'ticket',
        component: TicketComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
