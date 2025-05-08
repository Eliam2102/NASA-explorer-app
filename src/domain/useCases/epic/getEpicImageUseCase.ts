import { EpicImage } from "../../entidades/theme/epicTheme";
import { EpicThemeRepository } from "../../repository/epic/epicThemeRepository";



export class GetEpicImageUseCase {
    //inyeccion del repo atraves del constructor
    constructor (private repository: EpicThemeRepository){}

    //metodo para el usecase pueda obtener las imagenes
    async execute(): Promise<EpicImage[]>{
        return this.repository.getImageEpic();
    }
}