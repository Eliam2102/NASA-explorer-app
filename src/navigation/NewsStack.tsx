import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsDetailScreen from "../presentation/screens/news/DetailNewScreen";
import NewScreen from "../presentation/screens/news/BreakingNewsScreen";
import { BreakingNewStackParamList } from "../presentation/screens/news/types/types";

const Stack = createNativeStackNavigator<BreakingNewStackParamList>();

export default function BreakingNewsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BreakingNewsScreen"
      screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen
        name="BreakingNewsScreen"
        component={NewScreen}
        options={{ title: "Noticias" }}
      />
      <Stack.Screen
        name="DetailNewScreen"
        component={NewsDetailScreen}
        options={{
          title: "Detalle noticia",
          animation: "slide_from_bottom", 
        }}
      />
    </Stack.Navigator>
  );
}
