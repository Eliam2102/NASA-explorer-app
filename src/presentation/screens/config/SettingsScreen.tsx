import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../store/theme/themeSlice";
import { RootState } from "../../../store/global/store";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="titleLarge" style={[styles.text, { color: theme.colors.primary }]}>
        Pantalla de Configuración
      </Text>
      <Text style={{ color: theme.colors.secondary, marginBottom: 20 }}>
        Aquí puedes alternar entre el tema claro y oscuro
      </Text>
      <Button mode="contained" onPress={() => dispatch(toggleTheme())}>
        Cambiar a tema {isDark ? "claro" : "oscuro"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",     
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});