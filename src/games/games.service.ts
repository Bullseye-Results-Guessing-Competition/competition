import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { GamesRepository } from "./games.repoistory";
import { AddGameRequestDto } from "./dto/addGameRequest.dto";
import { GameEntity } from "./game.entity";
import { CompetitionsService } from "src/competitions/competitions.service";
import { AddGameResponseDto } from "./dto/addGameResponse.dto";
import { TeamsService } from "src/teams/teams.service";

@Injectable()
export class GamesService {

  constructor(  @Inject(GamesRepository) private gamesRepository : GamesRepository,
                @Inject(CompetitionsService) private competitionsService : CompetitionsService,
                @Inject(TeamsService) private teamsService : TeamsService){
  }

  async addGame( competitionId : number, addGameRequestDto: AddGameRequestDto): Promise<AddGameResponseDto> {    
    if(!(await this.competitionsService.findById(competitionId))){
      throw new BadRequestException();
    }

    if(!await this.areTheTeamsInTheCompetition(addGameRequestDto.teamAId, addGameRequestDto.teamBId, competitionId)){
      throw new BadRequestException();
    }


    if(await this.isOneOfTheTeamsAreAlreadyExistInTheFixture(addGameRequestDto.teamAId, addGameRequestDto.teamBId, addGameRequestDto.fixture, competitionId)){

      throw new BadRequestException();
    }


    const newGameEntity = new GameEntity();
    newGameEntity.competition = competitionId;
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

  async areTheTeamsInTheCompetition(teamAId : number, teamBId : number, competitionId : number) : Promise<boolean>{
    const teamAEntity = await this.teamsService.findById(teamAId);
    const teamBEntity = await this.teamsService.findById(teamBId);

    console.log(teamAEntity);
    console.log(teamAEntity.competition);

    console.log(competitionId);
    console.log(teamBEntity);

    console.log(teamAEntity && teamAEntity.competition === competitionId);

    console.log(teamBEntity && teamBEntity.competition === competitionId);
    
    return false;
    return teamAEntity && teamAEntity.competition === competitionId && teamBEntity && teamBEntity.competition === competitionId;
  }

}
