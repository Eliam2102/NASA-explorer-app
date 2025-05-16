import { TechTransferRepository } from "../../../../domain/repository/explore/tech/techportRepository";
import { Project } from "../../../../domain/entidades/explore/techport/techport";
import { GetTechTransferProjects } from "../../../service/explore/techport/techportService";
import { Params } from "../../../../domain/repository/planets/types/types";
import { StorageService } from "../../../service/storage/storageService";

export class TechTransferRepositoryImpl implements TechTransferRepository {
  private readonly service = new GetTechTransferProjects();
  private readonly storageKey = "tech_transfer_projects";

  async getProjectsTechTransfer(params: Params): Promise<Project[]> {
    try {
      // Obtener los proyectos desde el servicio
      const responses = await this.service.fetchProjects(params.query || '', params.page || 1);

      // Mapear las respuestas al formato de entidad esperado
      const projects: Project[] = responses.map((item) => ({
        id: item.id,
        nombre: item.title,
        detalle: item.description,
        url: item.url,
      }));

      // Guardar los proyectos en caché
      await StorageService.set(this.storageKey, projects);
      return projects;

    } catch (error) {
      console.error("Error al obtener los proyectos de transferencia tecnológica:", error);

      // Leer los proyectos desde caché en caso de error
      const cached = await StorageService.get<Project[]>(this.storageKey);
      return cached ?? [];
    }
  }
}