import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { CompetitionEntity } from 'src/competitions/competition.entity';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type=> CompetitionEntity, competition => competition.id)
  competition: number;

  @Column()
  name: string;
}
