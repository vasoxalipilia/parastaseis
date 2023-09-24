import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Ticket, TicketSchema } from './schemas/ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
