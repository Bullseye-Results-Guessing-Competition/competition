import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { CompetitionsModule } from 'src/competitions/competitions.module';


@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TeamsRepository]), CompetitionsModule],
  exports: [],
  providers: [TeamsService],
  controllers: [TeamsController],
})
export class TeamModule {}
