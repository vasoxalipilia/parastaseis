import { Ticket } from './Ticket.interface';
import { User } from './user.interface';

export interface Shipping {
  firstname: string;
  lastname: string;
  shippingAddress: string;
  postalCode: string;
  shippingCity: string;
  shippingTown: string;
  ticket?: Ticket;
  user?: User;
  // cardType: string;
  // cardNumber: string;
  // cardCvc: string;
  // expirationDate: string;
  // asShipping: boolean;
  // receiptFirstname: string;
  // receiptLastname: string;
  // receiptAddress: string;
  // receiptPostalcode: string;
  // receiptCity: string;
  // receiptTown: string;
}
