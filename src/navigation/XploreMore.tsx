import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreParamList } from "../presentation/screens/explorer/types/type";
import TechTransferScreen from "../presentation/screens/explorer/TechTransferScreen";
import DonkiScreen from "../presentation/screens/explorer/DonkiScreen";
import EpicScreen from "../presentation/screens/explorer/EpicScreen";
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
      name='Epic'
      component={EpicScreen}
      options={{title:'EPIC', tabBarIcon:({color, size, focused})=> (
        <FontAwesome5 name='image' color={color} size={size}  />
      )}}/>
      <Tab.Screen name='Tech' 
      component={TechTransferScreen} 
      options={{title:'TECH', tabBarIcon:({color, size, focused})=>(
        <FontAwesome5 name='microchip' color={color} size={size} solid={focused}/>
      )}}/>
    </Tab.Navigator>
  );
}
