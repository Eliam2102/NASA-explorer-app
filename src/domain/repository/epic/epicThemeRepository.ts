import { EpicImage } from "../../entidades/theme/epicTheme";

//Creo ahora la interface de repositorio para establecer el contrato que dbee seguir la capa de data
export interface EpicThemeRepository {
    getImageEpic(): Promise<EpicImage[]>;
}