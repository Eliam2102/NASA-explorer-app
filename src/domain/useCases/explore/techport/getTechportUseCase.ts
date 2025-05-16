import { Project } from "../../../entidades/explore/techport/techport";
import { TechTransferRepository } from "../../../repository/explore/tech/techportRepository";
import { Params } from "../../../repository/planets/types/types";

export class GetTechTransferUseCase {
  constructor(
    private repository: TechTransferRepository,
    private offlineRepository: TechTransferRepository
  ) {}

  async execute(params: Params, isOffline: boolean): Promise<Project[]> {
    return isOffline 
      ? this.offlineRepository.getProjectsTechTransfer(params)
      : this.repository.getProjectsTechTransfer(params);
  }
}