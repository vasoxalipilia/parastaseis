import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  passwordConfirm: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: String, enum: ['user', 'admin', 'organizer'], default: 'user' })
  role: string;

  _id?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
