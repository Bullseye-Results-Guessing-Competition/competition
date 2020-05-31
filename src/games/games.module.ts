import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repoistory';
import { CompetitionsModule } from 'src/competitions/competitions.module';
import { TeamModule } from 'src/teams/teams.module';


@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([GamesRepository]), CompetitionsModule, TeamModule],
  exports: [],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
