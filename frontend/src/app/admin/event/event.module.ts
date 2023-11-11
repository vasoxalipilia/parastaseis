import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketComponent } from './ticket/ticket.component';
import { EventRoutingModule } from './event-routing.module';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [NewComponent, EventComponent, TicketComponent],
  imports: [CommonModule, ReactiveFormsModule, EventRoutingModule],
})
export class EventModule {}
