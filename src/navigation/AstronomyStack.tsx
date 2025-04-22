import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ApodScreen from "../presentation/screens/astronomy/ApodScreen";
import NeowsScreen from "../presentation/screens/astronomy/NeowScreen";
import { AstronmyStackParamList } from "../presentation/screens/astronomy/types/types";

const Stack = createNativeStackNavigator<AstronmyStackParamList>();

//ahora que ya lo importe creo mi función para el compoentne JSX
export default function AstronomyStackNavigator(){
    return (
        // Comienzo con la creacion del Stack
        <Stack.Navigator
        initialRouteName="ApodScreen"
        screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="ApodScreen" component={ApodScreen} />
            <Stack.Screen name="NeowsScreen" component={NeowsScreen}/>
        </Stack.Navigator>
    );
}