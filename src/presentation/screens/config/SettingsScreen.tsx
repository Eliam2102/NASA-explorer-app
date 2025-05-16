import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme, Card, Switch, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../store/theme/themeSlice";
import { setOffline } from "../../../store/network/networkSlice";
import { RootState } from "../../../store/global/store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NetInfo from "@react-native-community/netinfo";
import { StorageService } from "../../../data/service/storage/storageService";
import { THEME_KEY } from "../../../utils/constants/themeKey";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const isOfflineManual = useSelector((state: RootState) => state.offline.isOffline);
  const isOffline = useSelector((state: RootState) => state.offline.isOffline); // <- estado combinado
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const offlineCombined = isOfflineManual || !isConnected;
    dispatch(setOffline(offlineCombined));
  }, [isOfflineManual, isConnected, dispatch]);

  const handleThemeToggle = async () => {
    const newTheme = !isDark;
    dispatch(setTheme(newTheme));
    await StorageService.set(THEME_KEY, newTheme);
  };

  const handleOfflineToggle = () => {
    const newOfflineManual = !isOfflineManual;
    dispatch(setOffline(newOfflineManual));
  };

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

          <List.Item
            title="Modo oscuro"
            description="Activa el tema oscuro"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => <Switch value={isDark} onValueChange={handleThemeToggle} />}
          />

          <List.Item
            title="Modo offline"
            description="Forzar modo sin conexión"
            left={props => <List.Icon {...props} icon="wifi-off" />}
            right={() => <Switch value={isOfflineManual} onValueChange={handleOfflineToggle} />}
          />

          <List.Item
            title="Estado de red"
            description={isOffline ? "Sin conexión (modo offline o sin red)" : "Conectado a internet"}
            left={props => (
              <List.Icon
                {...props}
                icon={isOffline ? "wifi-off" : "wifi"}
                color={isOffline ? theme.colors.error : theme.colors.primary}
              />
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
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    elevation: 6,
    paddingVertical: 30,
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