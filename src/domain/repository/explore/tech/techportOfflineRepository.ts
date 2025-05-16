import { Project } from "../../../entidades/explore/techport/techport";
import { Params } from "../../planets/types/types";
import { TechTransferRepository } from "./techportRepository";
import { StorageService } from "../../../../data/service/storage/storageService";

export class TechportOfflineRepository implements TechTransferRepository {
  private readonly storageKey = "tech_transfer_projects";
  private readonly maxCachedItems = 50;

  async getProjectsTechTransfer(params: Params): Promise<Project[]> {
    try {
      // Obtener datos almacenados localmente (modo offline)
      const cached = await StorageService.get<Project[]>(this.storageKey);

      if (!cached || cached.length === 0) {
        // Si no hay datos en caché, devolvemos un mensaje informativo
        return [{
          id: "no-data",
          nombre: "Sin conexión",
          detalle: "No hay datos disponibles en modo offline. Conéctate a internet para cargar proyectos.",
          url: ""
        }];
      }

      // 🔍 Validar y usar query si existe (modo búsqueda offline)
      const query = typeof params.query === 'string' ? params.query.toLowerCase() : null;

      if (query) {
        return cached.filter(project =>
          project.nombre?.toLowerCase().includes(query) ||
          project.detalle?.toLowerCase().includes(query)
        ).slice(0, this.maxCachedItems);
      }

      // 🧭 Si no hay búsqueda, se usa paginación simple
      const page = params.page || 1;
      const itemsPerPage = 10;
      const startIndex = (page - 1) * itemsPerPage;

      return cached.slice(startIndex, startIndex + itemsPerPage);

    } catch (error) {
      // 🧨 Si ocurre un error, lo mostramos en consola
      console.error("Error al leer proyectos desde caché:", error);
      return [];
    }
  }
}