import { Types } from 'mongoose';

export class ResponseUserDto {
  readonly _id: Types.ObjectId;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  // Include other user properties you want to expose
}
