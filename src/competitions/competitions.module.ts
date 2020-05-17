import { Module, HttpModule } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionRepository } from './competition.repository';


@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CompetitionRepository])],
  exports: [CompetitionsService],
  providers: [CompetitionsService],
  controllers: [CompetitionsController],
})
export class CompetitionsModule {}
