import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompetitionEntity } from 'src/competitions/competition.entity';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type=> CompetitionEntity, competition => competition.id)
  @JoinColumn()
  competition: number;

  @Column()
  teamAId: number;

  @Column()
  teamBId: number;

  @Column()
  fixture: number;
}
