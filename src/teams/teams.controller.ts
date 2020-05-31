import { Controller, UseGuards, Post, Body, Param, Get } from "@nestjs/common";
import { RolesGuard } from "src/guards/roles/roles.guard";
import { TokenGuard } from "src/guards/token/token.guard";
import { Roles } from "src/guards/roles/roles.decorator";
import { TeamsService } from "./teams.service";
import { AddTeamRequestDto } from "./dto/addTeamRequest.dto";
import { AddTeamResponseDto } from "./dto/addTeamResponse.dto";
import { TeamEntity } from "./team.entity";


@Controller('teams')
@UseGuards(RolesGuard)
@UseGuards(TokenGuard)
export class TeamsController {

    constructor(private readonly teamsService: TeamsService) {}

    @Roles('Admin')
    @Post(':competitionId')
    addTeam(@Param('competitionId') competitionId : number, @Body() addTeamRequestDto : AddTeamRequestDto) : Promise<AddTeamResponseDto>{
        return this.teamsService.addTeam(competitionId, addTeamRequestDto)
    }

    @Roles('Admin')
    @Get(':competitionId')
    getTeams(@Param('competitionId') competitionId : number) : Promise<TeamEntity[]>{
        return this.teamsService.getTeamsByCompetition(competitionId);
    }

}
