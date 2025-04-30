import { Asteroid } from "../../../entidades/neows/asteroid";
import { NeowsRepository } from "../../../repository/astronomy/neows/getAsteroidRepository";

export class GetAsteroidsPaginatedUseCase {
  constructor(private neowsRepository: NeowsRepository) {}

  //caso de uso para obtener lso asteroides, me apego a la forma tradicional de usar
  //mi entidad y conello un arreglo, puedo que vdnran varios  del mismo tipo
  //por ende seran varios objetos(array) de esa misma entidad
 async execute(start_date: string, end_date: string): Promise<Asteroid[]>{
    return this.neowsRepository.getAsteroids(start_date, end_date);
 }
}
