import { Controller, UseGuards, Post, Body } from "@nestjs/common";
import { RolesGuard } from "src/guards/roles/roles.guard";
import { TokenGuard } from "src/guards/token/token.gaurd";
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
    @Post()
    addCompetition(
      @Body() addGameRequestDto: AddGameRequestDto,
    ): Promise<AddGameResponseDto> {
      return this.gamesService.addGames(addGameRequestDto);
    }
}
