import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { TeamsRepository } from "./teams.repository";
import { AddTeamRequestDto } from "./dto/addTeamRequest.dto";
import { CompetitionsService } from "src/competitions/competitions.service";
import { TeamEntity } from "./team.entity";
import { AddTeamResponseDto } from "./dto/addTeamResponse.dto";

@Injectable()
export class TeamsService{

    constructor(@Inject(TeamsRepository) private teamsRepository : TeamsRepository, @Inject(CompetitionsService) private competitionsService : CompetitionsService){}

        
    async addTeam(competitionId: number, addTeamRequestDto: AddTeamRequestDto) {
        if(await !this.competitionsService.findById(competitionId)){
            throw new BadRequestException();
        }

        if(await this.teamsRepository.findOne({name: addTeamRequestDto.name})){
            throw new BadRequestException();
        }

        
    const newTeamEntity = new TeamEntity();
    newTeamEntity.competition = competitionId;
    newTeamEntity.name = addTeamRequestDto.name;
    try{
      const newTeam = await this.teamsRepository.save(newTeamEntity);
      const addTeamResponseDto = new AddTeamResponseDto();
      addTeamResponseDto.name = newTeam.name;

      return addTeamResponseDto;
    }catch(err){
      throw new InternalServerErrorException();
    }
    }
}