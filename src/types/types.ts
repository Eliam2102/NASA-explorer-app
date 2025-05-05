// types/navigation.ts
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootDrawerParamList = {
  index: undefined;
  astronomy: undefined;
  media: undefined;
  planets: undefined;
  explore: undefined;
  setting: undefined;
};

export type DrawerNavProp = DrawerNavigationProp<RootDrawerParamList>;
