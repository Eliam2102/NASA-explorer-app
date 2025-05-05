import { ItemsApodRepository } from "../../../../domain/repository/astronomy/apod/getItemsApodRepository";
import { GetItemsApods } from "../../../service/astronomy/apod/apoService";
import { ApodItem } from "../../../../domain/entidades/astronomy/apod/apodItem";
import { ApodModel } from "../../../models/astronomy/apod/apodModel";

export class apodItemRepositoryImple implements ItemsApodRepository {
    private service = new GetItemsApods();
  
    async getItemApod(date: string): Promise<ApodItem> {
      const model: ApodModel = await this.service.fetchItemsApod(date); 
  
      const entity: ApodItem = {
        title: model.title,
        explanation: model.explanation,
        url: model.url,
        date: model.date,
      };
  
      return entity;
    }
  }
  