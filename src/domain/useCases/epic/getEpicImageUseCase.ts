import { EpicImage } from "../../entidades/theme/epicTheme";
import { EpicThemeRepository } from "../../repository/epic/epicThemeRepository";

export class GetEpicImageUseCase {
  constructor(
    private onlineRepository: EpicThemeRepository,
    private offlineRepository: EpicThemeRepository
  ) {}

  async execute(isOffline: boolean): Promise<EpicImage[]> {
    if (isOffline) {
      return this.offlineRepository.getImageEpic();
    } else {
      return this.onlineRepository.getImageEpic();
    }
  }
}
