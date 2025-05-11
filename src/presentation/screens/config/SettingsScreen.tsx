import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme, Card, Switch, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../store/theme/themeSlice";
import { RootState } from "../../../store/global/store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();

  const handleThemeToggle = () => dispatch(toggleTheme());

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <View style={styles.header}>
            <Icon name="cog-outline" size={40} color={theme.colors.primary} />
            <Text variant="titleLarge" style={[styles.title, { color: theme.colors.primary }]}>
              Configuración
            </Text>
          </View>

          {/* Tema oscuro */}
          <List.Item
            title="Modo oscuro"
            description="Activa el tema oscuro"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch value={isDark} onValueChange={handleThemeToggle} />
            )}
          />

          {/* Modo offline (ejemplo) */}
          <List.Item
            title="Modo offline"
            description="Accede sin conexión"
            left={props => <List.Icon {...props} icon="wifi-off" />}
            right={() => (
              <Switch value={false} onValueChange={() => {}}  />
            )}
          />

          {/* Notificaciones (ejemplo) */}
          <List.Item
            title="Notificaciones"
            description="Recibir alertas importantes"
            left={props => <List.Icon {...props} icon="bell-outline" />}
            right={() => (
              <Switch value={false} onValueChange={() => {}} />
            )}
          />
        </Card.Content>
      </Card>
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
  card: {
    width: "100%",
    borderRadius: 16,
    elevation: 6,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
});