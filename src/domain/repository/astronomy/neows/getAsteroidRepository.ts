import { Asteroid } from "../../../entidades/astronomy/neows/asteroid";

export interface NeowsRepository {
  //metodo para obtenr los asteroides ( solo recibe dos parametros para conusmir esa API por rango de fecha)
  //que son la fehca inicial y fecha final para señara el rango
  getAsteroids(start_date: string, end_date: string ): Promise<Asteroid[]>;
}
