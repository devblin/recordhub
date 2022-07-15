import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CustomRequest } from 'src/shared';
import { CreateRepoBodyDto } from './repos.dto';
import { ReposService } from './repos.service';

@Controller('repo')
export class ReposController {
  constructor(private readonly reposService: ReposService) { }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllRepos(@Req() req: CustomRequest) {
    return await this.reposService.findAllByOwner(req.user.userName);
  }

  @Put('create')
  @UseGuards(JwtAuthGuard)
  async createRepo(@Req() req: CustomRequest, @Body() body: CreateRepoBodyDto) {
    const { name, private: isPrivate } = body;
    const { id } = req.user;

    const repo = await this.reposService.createOne(id, name, isPrivate);

    if (!repo.id) {
      throw new InternalServerErrorException();
    }

    return repo;
  }
}
