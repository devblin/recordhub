import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'passport';
import { User } from '../database/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  async findOrCreate(accessToken: string, profile: Profile): Promise<User> {
    const user = await this.userModel.findOne({
      where: { providerId: profile.id },
      attributes: { exclude: ['accessToken', 'email', 'providerId'] },
    });

    if (!user) {
      const newUser = await this.userModel.create({
        userName: profile.username,
        displayName: profile.displayName ?? profile.username,
        email: profile.emails[0].value,
        provider: profile.provider,
        providerId: profile.id,
        profileImage: profile.photos[0].value,
        accessToken,
      });

      return newUser;
    }

    await this.userModel.update({ accessToken }, {
      where: { id: user.id }
    })

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({
      order: [['id', 'DESC']],
      attributes: {
        exclude: ['accessToken', 'email', 'providerId'],
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['accessToken', 'email', 'providerId'] },
    });
  }

  async findOneComplete(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: { id },
    });
  }
}
