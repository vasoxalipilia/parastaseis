import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateShippingDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  shippingCity: string;

  @IsNotEmpty()
  @IsString()
  shippingTown: string;

  @IsNotEmpty()
  @IsString()
  cardType: string;

  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardCvc: string;

  @IsNotEmpty()
  @IsString()
  expirationDate: string;

  @IsString()
  ticket: Types.ObjectId;

  @IsString()
  user: Types.ObjectId;

  // @IsNotEmpty()
  // @IsString()
  // asShipping: boolean;

  // @IsNotEmpty()
  // @IsString()
  // receiptFirstname: string;

  // @IsNotEmpty()
  // @IsString()
  // receiptLastname: string;

  // @IsNotEmpty()
  // @IsString()
  // receiptAddress: string;

  // @IsNotEmpty()
  // @IsString()
  // receiptPostalcode: string;

  // @IsNotEmpty()
  // @IsString()
  // receiptCity: string;

  // @IsNotEmpty()
  // @IsString()
  // receiptTown: string;
}
