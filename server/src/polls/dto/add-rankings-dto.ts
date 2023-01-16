import { IsString } from 'class-validator';

export class AddRankingsDto {
  @IsString({ each: true })
  rankings: string[];
}
