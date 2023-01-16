import { IsString, Length } from 'class-validator';

export class AddNominationDto {
  @IsString()
  @Length(2, 100)
  text: string;
}
