import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/auth.guard';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { Shipping, shippingSchema } from './schemas/shipping.schema';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-auth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, // Token expiration time.
      }),
      inject: [ConfigService],
    }),
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   // signOptions: { expiresIn: '2 days' },
    //   signOptions: { expiresIn: '1h' }, // Token expiration time.
    // }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Shipping.name, schema: shippingSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [AuthService, AuthGuard, UserService, JwtStrategy, ConfigService],
})
export class UserModule {}
