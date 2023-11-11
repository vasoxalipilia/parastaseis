import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Req,
  Res,
  Session,
  Param,
  UseGuards,
  UnauthorizedException,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Roles } from './custom-decorators/role.decorator';
import { RoleGuard } from './guards/role.guard';
// import { RolesGuard } from './guards/role.guard';
// import { Roles } from './custom-decorators/role.decorator';
// import { Roles } from './custom-decorators/role.decorator';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Req() req,
    @Res() res,
    @Body() loginDto: LoginDto,
    // @Session() session: Record<string, any>,
  ): Promise<{ user: User }> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    const jwt = this.authService.createJwt(user);

    this.authService.setJwtInCookie(jwt, res);

    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/logout')
  async signout(
    @Res() res,
    @Req() req,
    @Session() session: Record<string, any>,
  ) {
    // Clear the session (assuming you're using Express session middleware)
    req.session = null;

    // Clear the cookie
    res.clearCookie('jwt');

    return res.status(HttpStatus.OK).json({});
  }

  @Get('/all')
  async getUsers(@Res() res, @Session() session: Record<string, any>) {
    const users = await this.userService.findAllUsers();

    return await res.status(HttpStatus.OK).json(users);
  }

  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = new this.authService.userModel(createUserDto);
    return user.save();
  }

  @UseGuards(JwtAuthGuard)
  @Get('isAuth')
  async validateAuth(@Req() req, @Res() res) {
    return await res.status(HttpStatus.OK).json({});
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @Get('isAdmin')
  async validateAdmin(@Req() req, @Res() res) {
    return await res.status(HttpStatus.OK).json({});
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles('organizer', 'admin')
  @Get('isOrganizer')
  async validateOrganizer(@Req() req, @Res() res) {
    return await res.status(HttpStatus.OK).json({});
  }

  @Post('/shipping')
  async registerShipping(@Body() createShippingDto: CreateShippingDto) {
    const shipping = new this.userService.shippingModel(createShippingDto);
    // Create a new object with only the desired properties
    const responseObj = {
      firstname: shipping.firstname,
      lastname: shipping.lastname,
    };

    // Save the shipping object
    await shipping.save();

    return responseObj; // Send the filtered object to the frontend
  }

  @Get('/shipping/:user')
  async getShipping(@Req() req, @Res() res, @Param() param) {
    const user = param.user.replace(/"/g, '');

    const shippings = await this.userService.findTickets(user);

    // // Exclude the password field from each user object in the tickets array
    // const ticketsWithoutPasswords = tickets.map((ticket) => {
    //   const userWithoutPassword = { ...ticket.user };
    //   delete userWithoutPassword.password;
    //   return { ...ticket, user: userWithoutPassword };
    // });

    return res.status(HttpStatus.OK).json({ shippings });
  }

  @Put('role/:role')
  async updateTicket(@Param() param, @Res() res, @Body() updatedData: any) {
    const role = param.role;
    const user = updatedData.user;

    const updatedDocument = await this.userService.updateRole(role, user);

    // console.log({ updatedDocument });

    return res.status(HttpStatus.OK).json({ updatedDocument });
  }

  @Delete('/:userId')
  async deleteUser(@Param() param, @Res() res, @Body() updatedData: any) {
    const userId = param.userId;
    // console.log({ userId });

    const updatedDocument = await this.userService.deleteUser(userId);

    // console.log({ updatedDocument });

    return res.status(HttpStatus.OK).json({ updatedDocument });
  }
}
