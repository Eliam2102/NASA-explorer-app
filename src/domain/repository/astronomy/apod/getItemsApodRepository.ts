import { ApodItem } from '../../../entidades/astronomy/apod/apodItem';


//creo la interface de mi repositorio
//en este caso son los contratos qeudeben cumplirse en la capa de Data
export interface ItemsApodRepository {
    //el único contrato es de traer la imagén,
    //tampoco aplica [] usar arreglo porque solo trae una
    getItemApod(date: string): Promise<ApodItem>;
}