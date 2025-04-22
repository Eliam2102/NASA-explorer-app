import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Planet } from '../interface/Planet';


// los que pasan tipado de rutas 
export type PlanetStackParamList = {
    PlanetsScreen: undefined;
    DetailsPlanetScreen: { planet: Planet};
};

// El tipo de navegación
export type PlanetStackNavigationProp = NativeStackNavigationProp<PlanetStackParamList>;
