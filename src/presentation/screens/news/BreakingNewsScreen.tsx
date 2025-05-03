import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BreakingNewsStackNavigationProp } from './types/types'; 
import { New } from "./interface/New";
import { Text, useTheme, Surface } from "react-native-paper";
//exteder la interface

interface NewsItemProps extends New {
  onPress: () => void;
}

const NewsItem = ({ title, description, link, onPress }: NewsItemProps) => {
  return (
    <TouchableOpacity style={styles.newsItem} onPress={onPress}>
      <Text style={styles.newsTitle}>{title}</Text>
      <Text style={styles.newsDescription}>
        {description || "No hay descripción disponible."}
      </Text>
      </TouchableOpacity>
  );
};


export default function NewScreen() {
  //usar tema
  const theme = useTheme();
  const [newsData, setNewsData] = useState<any[]>([]); // Aquí usaremos el tipo de respuesta del parser RSS
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<BreakingNewsStackNavigationProp>();  // Asegúrate de tipar correctamente

  // Simulando datos
  const fetchNews = async () => {
    // Lógica para obtener noticias (RSS)
    setNewsData([
      { id: '1', title: 'Noticia 1', description: 'Resumen de noticia 1', link: 'http://example.com/noticia1' },
      { id: '2', title: 'Noticia 2', description: 'Resumen de noticia 2', link: 'http://example.com/noticia2' },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleNewsItemPress = (item: New) => {
    navigation.navigate("DetailNewScreen", { news: item });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: theme.colors.primary }]}>Últimas Noticias</Text>
      {loading ? (
        <Text style={[styles.loadingText, {color: theme.colors.primary}]}>Cargando noticias...</Text>
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewsItem
              id={item.id}
              title={item.title}
              description={item.description}
              link={item.link}
              onPress={() => handleNewsItemPress(item)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,// Usar el fondo blanco del tema
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold", // Texto en azul oscuro
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
     // Texto secundario gris
  },
  newsItem: {
    padding: 10,
    marginBottom: 10,
    // backgroundColor: nasaLightTheme.surface, // Fondo de tarjeta
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: nasaLightTheme.border, // Borde sutil
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // color: nasaLightTheme.textPrimary, // Texto primario en azul oscuro
  },
  newsDescription: {
    fontSize: 14,
    // color: nasaLightTheme.textSecondary, // Texto secundario en gris
    marginTop: 5,
  },
});
