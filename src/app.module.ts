import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompetitionsModule } from './competitions/competitions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from './games/games.module';
import { TeamModule } from './teams/teams.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CompetitionsModule, GamesModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
