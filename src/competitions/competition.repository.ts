import { EntityRepository, Repository } from "typeorm";
import { CompetitionEntity } from "./competition.entity";

@EntityRepository(CompetitionEntity)
export class CompetitionRepository extends Repository<CompetitionEntity>{

}
