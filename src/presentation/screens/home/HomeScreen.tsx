import React from "react";
import { View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { Text, useTheme, Surface } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { DrawerNavProp } from "../../../types/types";
import NasaCard from "../../../components/Cards/CardHome";

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavProp>();
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineLarge" style={[styles.welcomeText, { color: theme.colors.primary }]}>
        Bienvenido al Universo NASA
      </Text>

      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: 'https://images-assets.nasa.gov/image/iss042e013697/iss042e013697~large.jpg' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <Surface style={[styles.labelContainer, { backgroundColor: theme.colors.elevation.level1 }]}>
          <Text style={[styles.labelText, { color: theme.colors.onSurface }]}>Imagen del día</Text>
        </Surface>
      </View>

      <View style={styles.grid}>
        <NasaCard 
          title="Astronomía"
          iconName="meteor"
          backgroundColor={theme.colors.primary}
          onPress={() => navigation.navigate("astronomy")}
        />
        <NasaCard 
          title="Multimedia"
          iconName="satellite-dish"
          backgroundColor={theme.colors.primary}
          onPress={() => navigation.navigate("media")}
        />
        <NasaCard 
          title="Noticias"
          iconName="satellite"
          backgroundColor={theme.colors.primary}
          onPress={() => navigation.navigate("news")}
        />
        <NasaCard 
          title="Planetas"
          iconName="globe"
          backgroundColor={theme.colors.primary}
          onPress={() => navigation.navigate("planets")}
        />
        <Pressable style={[styles.exploreMore, { backgroundColor: theme.colors.secondaryContainer }]} onPress={() => navigation.navigate("explore")}>
          <Text style={[styles.exploreText, { color: theme.colors.onSecondaryContainer }]}>🔭 Explorar más</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 28,
  },
  imageWrapper: {
    width: '100%',
    marginBottom: 30,
    position: 'relative',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    borderWidth: 1,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: -1,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  labelText: {
    fontWeight: '600',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 30,
  },
  exploreMore: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 40,
  },
  exploreText: {
    fontSize: 16,
    fontWeight: "600",
  },
});