import { EntityRepository, Repository } from "typeorm";
import { TeamEntity } from "./team.entity";

@EntityRepository(TeamEntity)
export class TeamsRepository extends Repository<TeamEntity>{

}
