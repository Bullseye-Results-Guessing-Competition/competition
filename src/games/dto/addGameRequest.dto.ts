import { IsNotEmpty } from 'class-validator';

export class AddGameRequestDto {

    @IsNotEmpty()
    teamAId: number;

    @IsNotEmpty()
    teamBId: number;

    @IsNotEmpty()
    fixture: number;
}
