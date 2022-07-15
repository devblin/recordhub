import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { IUser } from '../../shared';
import { JwtAuthService } from '../jwt/jwt.service';
import { GithubGuard } from './github.guard';

@Controller('auth/github')
export class GithubController {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly configService: ConfigService,
  ) { }

  @Get()
  @UseGuards(GithubGuard)
  async githubAuth() { }

  @Get('callback')
  @UseGuards(GithubGuard)
  async githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as IUser;

    const { token } = this.jwtAuthService.login(user);
    res.cookie('jwt', token);

    return res.redirect(process.env.FRONTEND_BASE_URL);
  }
}
