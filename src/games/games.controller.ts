import { Controller, UseGuards, Post, Body, Param } from "@nestjs/common";
import { RolesGuard } from "src/guards/roles/roles.guard";
import { TokenGuard } from "src/guards/token/token.guard";
import { GamesService } from "./games.service";
import { Roles } from "src/guards/roles/roles.decorator";
import { AddGameRequestDto } from "./dto/addGameRequest.dto";
import { AddGameResponseDto } from "./dto/addGameResponse.dto";


@Controller('games')
@UseGuards(RolesGuard)
@UseGuards(TokenGuard)
export class GamesController {

    constructor(private readonly gamesService: GamesService) {}

    @Roles('Admin')
    @Post(':competitionId')
    addGame(
      @Param('competitionId') competitionId : number, @Body() addGameRequestDto: AddGameRequestDto,
    ): Promise<AddGameResponseDto> {
      return this.gamesService.addGame(competitionId, addGameRequestDto);
    }
}
