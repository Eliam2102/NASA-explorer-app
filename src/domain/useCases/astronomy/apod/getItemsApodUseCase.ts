import { ApodItem } from "../../../entidades/apodItem";
import { ItemsApodRepository } from "../../../repository/astronomy/apod/getItemsApodRepository";
//aqui unicamente importamos la entidad del dominio
//y de igual manera el repositorio


//ahora construyo la class qeu exportare como el useCase
export class GetItemsApodUseCase {
    constructor(private repository: ItemsApodRepository){}

    //ahora si creo la acción
    async execute(date: string): Promise<ApodItem>{
        return this.repository.getItemApod(date);
    }
}
