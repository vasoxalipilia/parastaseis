import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  seats: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  socialType: string;

  @IsNotEmpty()
  @IsString()
  event: Types.ObjectId;
}
