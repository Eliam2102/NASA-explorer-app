import { Project } from "../../../entidades/explore/techport/techport";
import { TechTransferRepository } from "../../../repository/explore/tech/techportRepository";
import { Params } from "../../../repository/planets/types/types";

export class GetTechTransferUseCase {
  constructor(private repository: TechTransferRepository) {}

  async execute(params: Params): Promise<Project[]> {
    return this.repository.getProjectsTechTransfer(params);
  }
}
