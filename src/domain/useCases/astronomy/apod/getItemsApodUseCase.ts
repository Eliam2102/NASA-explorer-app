// domain/usecases/astronomy/apod/GetItemsApodUseCase.ts
import { ApodItem } from "../../../entidades/astronomy/apod/apodItem";
import { ItemsApodRepository } from "../../../repository/astronomy/apod/getItemsApodRepository";

export class GetItemsApodUseCase {
  constructor(
    private apiRepository: ItemsApodRepository,
    private offlineRepository: ItemsApodRepository
  ) {}

  async execute(date: string, isOffline: boolean): Promise<ApodItem> {
    if (isOffline) {
      return this.offlineRepository.getItemApod(date);
    } else {
      return this.apiRepository.getItemApod(date);
    }
  }
}