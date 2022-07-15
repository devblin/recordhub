import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CustomRequest } from '../shared';

@Controller('user')
export class UsersController {
  constructor() {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Req() req: CustomRequest) {
    return req.user;
  }
}
