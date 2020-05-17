import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { TokenGuard } from 'src/guards/token/token.gaurd';
import { CompetitionEntity } from './competition.entity';
import { AddCompetitionRequestDto } from './dto/addCompetitionRequest.dto';
import { Roles } from 'src/guards/roles/roles.decorator';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { DeleteCompetitionResponseDto } from './dto/DeleteCompetitionResponse.dto';
import { UpdateCompetitionRequestDto } from './dto/updateCompetitionRequest.dto';
import { UpdateCompetitionResponseDto } from './dto/updateCompetitionResponse.dto';
import { AddCompetitionResponseDto } from './dto/addCompetitionResponse.dto';

@Controller('competitions')
@UseGuards(RolesGuard)
@UseGuards(TokenGuard)
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Roles('Admin')
  @Get()
  getCompetitions(): Promise<CompetitionEntity[]> {
    return this.competitionsService.getAllCompetitions();
  }

  @Roles('Admin')
  @Post()
  addCompetition(
    @Body() addCompetitionRequestDto: AddCompetitionRequestDto,
  ): Promise<AddCompetitionResponseDto> {
    return this.competitionsService.addCompetition(addCompetitionRequestDto);
  }

  @Roles('Admin')
  @Delete(':id')
  deleteCompetition(
    @Param('id') id: number,
  ): Promise<DeleteCompetitionResponseDto> {
    return this.competitionsService.deleteCompetition(id);
  }

  @Roles('Admin')
  @Put(':id')
  updateCompetition(
    @Param('id') id: number,
    @Body() updateCompetitionRequstDto: UpdateCompetitionRequestDto,
  ): Promise<UpdateCompetitionResponseDto> {
    return this.competitionsService.updateCompetition(
      id,
      updateCompetitionRequstDto,
    );
  }
}
