import { MarsRepository } from "../../../domain/repository/planets/marsRepository"; // 🧭 Contrato o interfaz que define lo que debe hacer el repositorio
import { MarsPhotoRover } from "../../../domain/entidades/planets/marsRover"; // 🌍 Entidad que usamos en la capa de dominio
import { GetMarsPhotoRoverService } from "../../service/planets/marsService"; // 🚀 Servicio que se conecta a la API externa
import { MarsParams } from "../../../domain/entidades/planets/marsParams"; // 🧩 Parámetros que se usan para consultar la API

// 🛠 Esta clase implementa el repositorio (MarsRepositoryImpl)
// Se encarga de obtener datos desde el servicio y convertirlos a entidades del dominio
export class MarsRepositoryImpl implements MarsRepository {

  // Creamos una instancia del servicio que maneja la llamada a la API (patrón: Composición)
  private service = new GetMarsPhotoRoverService();

  // Implementamos el método definido en la interfaz MarsRepository
  // Este método recibe los filtros como parámetros y devuelve entidades de dominio
  async getMarsPhotRover(params: MarsParams): Promise<MarsPhotoRover[]> {
    // Llamamos al servicio que hace la solicitud HTTP a la NASA
    const response = await this.service.getPhotoMars(params);

    // Transformamos los datos crudos de la API (MarsModel) en nuestra entidad de dominio (MarsPhotoRover)
    const mappedPhotos: MarsPhotoRover[] = response.photos.map(photo => ({
        id: photo.id,
        sol: photo.sol,
        cameraName: photo.camera.full_name,
        imageUrl: photo.img_src,       
        date: photo.earth_date,
        solDate: photo.sol,
        roverName: photo.rover.name,
        status: photo.rover.status, 
      }));

    // Devolvemos la lista de entidades listas para ser usadas en el caso de uso o UI
    return mappedPhotos;
  }
}