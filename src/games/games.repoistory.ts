import { EntityRepository, Repository } from "typeorm";
import { GameEntity } from "./game.entity";

@EntityRepository(GameEntity)
export class GamesRepository extends Repository<GameEntity>{

}
