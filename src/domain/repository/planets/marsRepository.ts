import { MarsPhotoRover } from "../../entidades/planets/marsRover";
//importo la interface de los paramts
import { MarsParams } from "../../entidades/planets/marsParams";

export interface MarsRepository {

    //definir mi meotod para obtener y que parametro recibe, los tipare para evitar problemas
    //asi lo tendré sin problema como deberian de ser y evitar ocnflictos 
    getMarsPhotRover(params: MarsParams): Promise<MarsPhotoRover[]>;
}