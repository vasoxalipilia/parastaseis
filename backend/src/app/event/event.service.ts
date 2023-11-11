import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) public eventModel: Model<EventDocument>,
    @InjectModel(Ticket.name) public ticketModel: Model<TicketDocument>,
  ) {}

  async findEventsByCategory(category: string) {
    return this.eventModel.find({ category });
  }

  async findTicketsByEvent(event: string) {
    return this.ticketModel.find({ event }).sort({ date: 1 });
  }

  async updateTicket(
    event: string,
    socialType: string,
    date: string,
    time: string,
    seats: any,
  ) {
    return this.ticketModel.findOneAndUpdate(
      { event, socialType, date, time },
      { seats },
      { new: true }, // Return the updated document instead of the old one
    );
  }
}
