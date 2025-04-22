import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlanetStackParamList } from "../presentation/screens/planets/types/types";
import PlanetsScreen from "../presentation/screens/planets/PlanetsScreen";
import DetailPlanetScreen from "../presentation/screens/planets/DetailPlanetScreen";



const Stack = createNativeStackNavigator<PlanetStackParamList>();

export default function PlanetStackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="PlanetsScreen"
    screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen name="PlanetsScreen" component={PlanetsScreen} />
      <Stack.Screen name="DetailsPlanetScreen" component={DetailPlanetScreen} />
    </Stack.Navigator>
  );
}
