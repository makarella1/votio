import { Length, IsString } from 'class-validator';

export class RejoinPollDto {
  @IsString()
  userId: string;

  @IsString()
  @Length(6, 6)
  pollId: string;

  @IsString()
  @Length(2, 25)
  name: string;
}
