import { Params } from "../../planets/types/types";
import { Project } from '../../../entidades/explore/techport/techport';

export interface TechTransferRepository {
  getProjectsTechTransfer(params: Params): Promise<Project[]>;
}
