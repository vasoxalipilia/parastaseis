import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        // Try to extract JWT from the Authorization header
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');

        // If not found in header, try to get it from the cookie
        if (!token) {
          try {
            return req.cookies['jwt'];
          } catch {
            throw new UnauthorizedException('jwt is not provided!');
          }
        }

        return token;
      },
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
