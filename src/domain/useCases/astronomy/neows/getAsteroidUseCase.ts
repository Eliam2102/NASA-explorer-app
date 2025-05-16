import { Asteroid } from "../../../entidades/astronomy/neows/asteroid";
import { NeowsRepository } from "../../../repository/astronomy/neows/getAsteroidRepository";
import { NeowsOfflineRepository } from "../../../repository/astronomy/neows/getItemsNeowsOfflineRepository";
export class GetAsteroidsPaginatedUseCase {
  constructor(
   private neowsRepository: NeowsRepository,
   private neowsOfflineRepository: NeowsOfflineRepository
   ) {}

  //caso de uso para obtener lso asteroides, me apego a la forma tradicional de usar
  //mi entidad y conello un arreglo, puedo que vdnran varios  del mismo tipo
  //por ende seran varios objetos(array) de esa misma entidad
 async execute(start_date: string, end_date: string, isOffline: boolean): Promise<Asteroid[]>{
   if(isOffline){
    return this.neowsOfflineRepository.getAsteroids(start_date, end_date);//si el view model pasa que isOffline hace esta
   }else{
      return this.neowsRepository.getAsteroids(start_date, end_date);//si no continua con el contrato
   }
 }
}
