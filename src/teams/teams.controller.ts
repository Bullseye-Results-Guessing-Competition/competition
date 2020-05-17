import { Controller, UseGuards, Post, Body, Param } from "@nestjs/common";
import { RolesGuard } from "src/guards/roles/roles.guard";
import { TokenGuard } from "src/guards/token/token.gaurd";
import { Roles } from "src/guards/roles/roles.decorator";
import { TeamsService } from "./teams.service";
import { AddTeamRequestDto } from "./dto/addTeamRequest.dto";


@Controller('teams')
@UseGuards(RolesGuard)
@UseGuards(TokenGuard)
export class TeamsController {

    constructor(private readonly teamsService: TeamsService) {}

    @Roles('Admin')
    @Post(':competitionId')
    addTeam(@Param('competitionId') competitionId : number, @Body() addTeamRequestDto : AddTeamRequestDto){
        return this.teamsService.addTeam(competitionId, addTeamRequestDto)
    }

}
