import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  role: string;
}
