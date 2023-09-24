// role.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      // No roles defined; allow access
      return true;
    }

    // get the user from decoding the jwt payload
    const request = context.switchToHttp().getRequest();
    let user: User;
    let jwt: string;

    try {
      jwt = request.cookies['jwt'];
      user = this.authService.decodeJwt(jwt);
    } catch {
      throw new UnauthorizedException('jwt is not provided!');
    }

    // const user = request.user; // Assuming you have saved the user to the req object after login
    // Check if the user has one of the required roles
    const hasRole = roles.some((role) => user.role.includes(role));

    return hasRole;
  }
}
