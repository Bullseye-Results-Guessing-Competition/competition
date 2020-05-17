import { Injectable, Inject, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CompetitionRepository } from './competition.repository';
import { CompetitionEntity } from './competition.entity';
import { AddCompetitionRequestDto } from './dto/addCompetitionRequest.dto';
import { AddCompetitionResponseDto } from './dto/addCompetitionResponse.dto';
import { DeleteCompetitionResponseDto } from './dto/DeleteCompetitionResponse.dto';
import { UpdateCompetitionRequestDto } from './dto/updateCompetitionRequest.dto';
import { UpdateCompetitionResponseDto } from './dto/updateCompetitionResponse.dto';

@Injectable()
export class CompetitionsService {

  constructor(@Inject(CompetitionRepository) private competitionRepository : CompetitionRepository){

  }

    async addCompetition(addCompetitionRequestDto: AddCompetitionRequestDto): Promise<AddCompetitionResponseDto> {
      if(await this.competitionRepository.findOne({name: addCompetitionRequestDto.name})){
        throw new BadRequestException();
      }

      const newCompetitionEntity = new CompetitionEntity();
      newCompetitionEntity.name = addCompetitionRequestDto.name;

      try{
        const newCompetition = await this.competitionRepository.save(newCompetitionEntity);
        const addCompetitionResponseDto = new AddCompetitionResponseDto();
        addCompetitionResponseDto.id = newCompetition.id;
        addCompetitionResponseDto.name = newCompetition.name;

        return addCompetitionResponseDto;
      }catch(err){
        throw new InternalServerErrorException();
      }
    }


    async getAllCompetitions(): Promise<CompetitionEntity[]> {
    return await this.competitionRepository.find();
  }

  async deleteCompetition(id: number): Promise<DeleteCompetitionResponseDto>{
    const competitionEntity = await this.competitionRepository.findOne({id: id})
    if(!competitionEntity){
      throw new NotFoundException();
    }
    try{
      await this.competitionRepository.delete(id);
      const deleteCompetitionResponseDto = new DeleteCompetitionResponseDto();
      deleteCompetitionResponseDto.id = id;
      deleteCompetitionResponseDto.name = name;
      return deleteCompetitionResponseDto;
    }catch(err){
      throw new InternalServerErrorException();
    }
  }

  async updateCompetition(id: number, updateCompetitionRequestDto : UpdateCompetitionRequestDto) : Promise<UpdateCompetitionResponseDto> {
    const competitionEntity = await this.competitionRepository.findOne({id: id});
    
    if(!competitionEntity){
      throw new NotFoundException();
    }
    if(updateCompetitionRequestDto.name){
      competitionEntity.name = updateCompetitionRequestDto.name;
    }
    try{
      await this.competitionRepository.update(id, competitionEntity);
      const updateCompetitionResponseDto = new UpdateCompetitionResponseDto();
      updateCompetitionResponseDto.name = competitionEntity.name;
      return updateCompetitionResponseDto;
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async findById(competitionId: number) {
    return await this.competitionRepository.findOne({id: competitionId})
  }

}
