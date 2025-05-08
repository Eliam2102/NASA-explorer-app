import { TechTransferRepository } from "../../../../domain/repository/explore/tech/techportRepository";
import { Project } from "../../../../domain/entidades/explore/techport/techport";
import { GetTechTransferProjects } from "../../../service/explore/techport/techportService";
import { Params } from "../../../../domain/repository/planets/types/types";

export class TechTransferRepositoryImpl implements TechTransferRepository {
  private readonly service = new GetTechTransferProjects();

  async getProjectsTechTransfer(params: Params): Promise<Project[]> {
    const responses = await this.service.fetchProjects(params.query || '', params.page || 1);

    const projects: Project[] = responses.map((item) => ({
      id: item.id,
      nombre: item.title,
      detalle: item.description,
      url: item.url,
    }));

    return projects;
  }
}
