import { CEvent } from './event.interface';
import { User } from './user.interface';

export interface Ticket {
  time: string;
  price: string;
  seats: string;
  date: string;
  socialType: string;
  event: CEvent;
  user?: User;
  _id?: string;
}
