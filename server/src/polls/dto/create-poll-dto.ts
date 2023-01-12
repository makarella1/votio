import { IsString, Length, IsInt, Min, Max } from 'class-validator';

export class CreatePollDto {
  @IsString()
  @Length(3, 100)
  topic: string;

  @IsInt()
  @Min(1)
  @Max(5)
  votesPerVoter: number;

  @IsString()
  @Length(2, 25)
  name: string;
}
