import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  seats: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  socialType: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Event', required: true })
  event: Types.ObjectId;

  _id?: Types.ObjectId;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
