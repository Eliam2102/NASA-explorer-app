import { MarsPhotoRover } from "../../entidades/planets/marsRover";
import { MarsParams } from "../../entidades/planets/marsParams";
import { MarsRepository } from "../../repository/planets/marsRepository";

export class GetPhotoMarsRoverUseCase {
  // Inyección de dependencias: online y offline
  constructor(
    private apiRepository: MarsRepository,
    private offlineRepository: MarsRepository
  ) {}

  // Método para obtener fotos del Mars Rover según conexión
  async execute(params: MarsParams, isOffline: boolean): Promise<MarsPhotoRover[]> {
    if (isOffline) {
      return this.offlineRepository.getMarsPhotRover(params);
    } else {
      return this.apiRepository.getMarsPhotRover(params);
    }
  }
}