import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CompetitionEntity } from 'src/competitions/competition.entity';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type=> CompetitionEntity, competition => competition.id)
  @JoinColumn()
  competition: number;

  @Column()
  name: string;
}
