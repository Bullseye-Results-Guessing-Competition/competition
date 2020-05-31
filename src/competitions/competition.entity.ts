import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { GameEntity } from 'src/games/game.entity';
import { TeamEntity } from 'src/teams/team.entity';

@Entity('competition')
export class CompetitionEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(type => GameEntity, game => game.competition)
  @OneToMany(type => TeamEntity, team => team.competition)
  id: number;

  @Column()
  name: string;
}
