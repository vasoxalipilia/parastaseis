import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Response } from 'express';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) public userModel: Model<UserDocument>,
  ) {}

  setJwtInCookie(jwt: string, res: Response) {
    res.cookie('jwt', jwt, {
      // maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (1 day)
      maxAge: 1 * 60 * 60 * 1000, // Cookie expiration (1 hour)
      httpOnly: true, // Prevent client-side JavaScript access
    });
  }

  // Create a JWT with a username
  createJwt(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<ResponseUserDto | null> {
    const user = await this.userModel.findOne({ username, password }).exec();
    return this.mapToResponseUserDto(user);
  }

  // Map a user entity to a user DTO, excluding the password field
  private mapToResponseUserDto(user: User): ResponseUserDto {
    const { _id, username, firstName, lastName, role } = user;
    return { _id, username, firstName, lastName, role };
  }

  async findUser(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  decodeJwt(token: string) {
    const decoded = this.jwtService.verify(token);
    return decoded;
  }
}
