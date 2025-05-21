import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreParamList } from "../presentation/screens/explorer/types/type"
import DonkiScreen from "../presentation/screens/explorer/DonkiScreen";
import TechportScreen from "../presentation/screens/explorer/TechPort";
import EpicScreen from "../presentation/screens/explorer/epicScreen";
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<ExploreParamList>();

export default function ExploreNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007bff",
      }}
    >
      <Tab.Screen 
      name='Donki' 
      component={DonkiScreen}
      options={{title:'DONKI', tabBarIcon:({color, size, focused})=>(
        <FontAwesome5 name='space-shuttle' color={color} size={size} solid={focused} />
       )}} />
      <Tab.Screen 
      name='TechPort'
      component={TechportScreen}
      options={{title:'TechPort', tabBarIcon:({color, size, focused})=> (
        <FontAwesome5 name='cogs' color={color} size={size}  />
      )}}/>
      <Tab.Screen name='Epic'
      component={EpicScreen} 
      options={{title:'EPIC', tabBarIcon:({color, size, focused})=>(
        <FontAwesome5 name='satellite' color={color} size={size} solid={focused}/>
      )}}/>
    </Tab.Navigator>
  );
}
