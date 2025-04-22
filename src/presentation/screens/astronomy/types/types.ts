import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//aqui realizo el tipado, como no har paramettros no recibe nada pues es indefinido
export type AstronmyStackParamList = {
    ApodScreen: undefined;
    NeowsScreen: undefined;
};

// comos se usará en varias pantallas no especifico que sea solo de una porque se usar en esas dos 
export type AstronomyStackNavigationProp = NativeStackNavigationProp<AstronmyStackParamList>;


