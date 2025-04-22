import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


// 1. Este es tu tipo de rutas para las tabs
export type MediaTabsParamList = {
  GalleryScreen: undefined;
  VideoScreen: undefined;
};

// 2. Tipo para usar en navegación desde las screens de este Tab
export type MediaNavigationTabsProp = BottomTabNavigationProp<MediaTabsParamList>;
