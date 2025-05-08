import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreParamList } from "../presentation/screens/explorer/types/type"
import DonkiScreen from "../presentation/screens/explorer/DonkiScreen";
import EpicScreen from "../presentation/screens/explorer/TechPort";
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
      component={EpicScreen}
      options={{title:'TechPort', tabBarIcon:({color, size, focused})=> (
        <FontAwesome5 name='cogs' color={color} size={size}  />
      )}}/>
      {/* <Tab.Screen name='Cneos'
      component={TechTransferScreen} 
      options={{title:'CNEOS', tabBarIcon:({color, size, focused})=>(
        <FontAwesome5 name='microchip' color={color} size={size} solid={focused}/>
      )}}/> */}
    </Tab.Navigator>
  );
}
