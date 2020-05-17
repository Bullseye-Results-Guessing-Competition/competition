import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { GamesRepository } from "./games.repoistory";
import { AddGameRequestDto } from "./dto/addGameRequest.dto";
import { GameEntity } from "./game.entity";
import { CompetitionsService } from "src/competitions/competitions.service";
import { AddGameResponseDto } from "./dto/addGameResponse.dto";

@Injectable()
export class GamesService {

  constructor(@Inject(GamesRepository) private gamesRepository : GamesRepository, @Inject(CompetitionsService) private competitionsService : CompetitionsService){
  }

  async addGames(addGameRequestDto: AddGameRequestDto): Promise<AddGameResponseDto> {    
    if(await !this.competitionsService.findById(addGameRequestDto.competitionId)){

      throw new BadRequestException();
    }

    // if(!areTheTeamsInTheCompetition()){
    //   throw new BadRequestException();
    // }


    if(await this.isOneOfTheTeamsAreAlreadyExistInTheFixture(addGameRequestDto.teamAId, addGameRequestDto.teamBId, addGameRequestDto.fixture, addGameRequestDto.competitionId)){

      throw new BadRequestException();
    }


    const newGameEntity = new GameEntity();
    newGameEntity.competition = addGameRequestDto.competitionId;
    newGameEntity.fixture = addGameRequestDto.fixture;
    newGameEntity.teamAId = addGameRequestDto.teamAId;
    newGameEntity.teamBId = addGameRequestDto.teamBId;

    try{
      const newGame = await this.gamesRepository.save(newGameEntity);
      const addGameResponseDto = new AddGameResponseDto();
      addGameResponseDto.competitionId = newGame.competition;
      addGameResponseDto.fixture = newGame.fixture;
      addGameResponseDto.teamAId = newGame.teamAId;
      addGameResponseDto.teamBId = newGame.teamBId;

      return addGameResponseDto;
    }catch(err){
      throw new InternalServerErrorException();
    }
  }

  async isOneOfTheTeamsAreAlreadyExistInTheFixture(teamAId: number, teamBId: number, fixture: number, competitionId: number) : Promise<boolean>{
    const gamesArrayInFixture = await this.gamesRepository.find({competition: competitionId, fixture: fixture});
    if(gamesArrayInFixture.length === 0 ){      
      return false;
    }

    return  gamesArrayInFixture.some(game => game.teamAId === teamAId || game.teamBId === teamBId);
  }

}
