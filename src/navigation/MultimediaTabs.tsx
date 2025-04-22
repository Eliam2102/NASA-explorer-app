import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GalleryScreen from '../presentation/screens/media/GalleryScreen';
import VideoScreen from '../presentation/screens/media/VideoScreen';
import { MediaTabsParamList } from '../presentation/screens/media/types/types';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MediaTabsParamList>();


export default function MultimediaTabsNavigator() {
    return(

    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007bff",
      }}
    >
        {/* Tab para imagenes */}
        <Tab.Screen
        name='GalleryScreen'
        component={GalleryScreen}
        options={{title:'Imagenes', tabBarIcon:({color, size})=>(
            <FontAwesome5 name='images' color={color}size={size}/>
        )}}        
        />

         {/* Tab para videos */}
        <Tab.Screen
        name='VideoScreen'
        component={VideoScreen}
        options={{title:'Videos', tabBarIcon:({color, size})=>(
            <FontAwesome5 name='video' color={color}size={size}/>
        )}}        
        />
    </Tab.Navigator>
    );
}