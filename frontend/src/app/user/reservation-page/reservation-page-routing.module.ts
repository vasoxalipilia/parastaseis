import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { PrintTicketComponent } from './print-ticket/print-ticket.component';
import { ReservationPageComponent } from './reservation-page.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationPageComponent,
    children: [
      { path: '', redirectTo: 'tickets', pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent, pathMatch: 'full' },
      {
        path: 'shippingInformation',
        component: ShippingInformationComponent,
        pathMatch: 'full',
      },
      {
        path: 'printTicket',
        component: PrintTicketComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationPageRoutingModule {}
