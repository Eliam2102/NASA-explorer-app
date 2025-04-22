import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { New } from '../interface/New';
// Tipado de las pantallas y los parámetr
// os que pasan
export type BreakingNewStackParamList = {
    BreakingNewsScreen: undefined; // No pasa parámetros
    DetailNewScreen: { news: New }; // 'news' es el parámetro que pasas desde BreakingNewsScreen
};

// El tipo de navegación
export type BreakingNewsStackNavigationProp = NativeStackNavigationProp<BreakingNewStackParamList>;
