import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Planet } from '../interface/Planet';


// los que pasan tipado de rutas 
export type PlanetStackParamList = {
    PlanetsScreen: undefined;
    DetailsPlanetScreen: { planet: Planet}; //aqui esta espeficiado que el parametro que se le manda a la ruta es el planet, para no reahacer una llamada
    //como ya se trae la información u nicmanete consutrimos esa entidad y la pasamos a la pantalla que lo usará para mostrar
};

// El tipo de navegación
export type PlanetStackNavigationProp = NativeStackNavigationProp<PlanetStackParamList>;
