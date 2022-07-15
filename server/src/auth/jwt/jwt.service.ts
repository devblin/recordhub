import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser, JwtPayload } from '../../shared';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) { }

  login(user: IUser) {
    const { displayName, profileImage, id, userName } = user;
    const payload: JwtPayload = { displayName, profileImage, id, userName };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
