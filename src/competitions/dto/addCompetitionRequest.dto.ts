import { IsNotEmpty } from 'class-validator';

export class AddCompetitionRequestDto {

  @IsNotEmpty()
  name: string;
}
