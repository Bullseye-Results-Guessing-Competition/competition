import { IsNotEmpty } from 'class-validator';

export class AddTeamRequestDto {

    @IsNotEmpty()
    name: string;

}
