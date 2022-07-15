import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRepoBodyDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  private: boolean;
}
