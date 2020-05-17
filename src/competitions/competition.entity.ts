import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { GameEntity } from 'src/games/game.entity';
import { TeamEntity } from 'src/teams/team.entity';

@Entity('competition')
export class CompetitionEntity {
  @PrimaryGeneratedColumn()
  @OneToOne(type => GameEntity, game => game.competition)
  @OneToOne(type => TeamEntity, team => team.competition)
  id: number;

  @Column()
  name: string;
}
