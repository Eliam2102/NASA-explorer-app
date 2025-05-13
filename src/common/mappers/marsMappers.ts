import { MarsPhotoRover } from "../../domain/entidades/planets/marsRover";
import { MarsModel } from "../../data/models/planets/marsModel";

// Función para mapear un solo ítem
export function mapMarsModelToEntity(model: MarsModel): MarsPhotoRover {
  return {
    id: model.id,
    solDate: model.sol,
    cameraName: model.camera.full_name,
    imageUrl: model.img_src,
    date: model.earth_date,
    roverName: model.rover.name,
    status: model.rover.status,
  };
}

// Función para mapear una lista de ítems
export function mapMarsListToEntityList(models: MarsModel[]): MarsPhotoRover[] {
  return models.map(mapMarsModelToEntity);
}