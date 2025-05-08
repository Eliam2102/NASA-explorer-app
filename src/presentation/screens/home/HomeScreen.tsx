import React, { useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { Text, useTheme, Surface, ActivityIndicator } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { DrawerNavProp } from "../../../types/types";
import NasaCard from "../../../components/Cards/CardHome";
import { useApodViewModelImage } from "../../viewmodels/astronmy/apod/nowImageApod";
import { format } from "date-fns";

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavProp>();
  const theme = useTheme();
  //instancia de mi vieewmodel
  const today = format(new Date(), "yyyy-MM-dd");
  const { imageUrl, loading } = useApodViewModelImage(today);
  
  //validar la url 
  function isValidImageUrl(url: string) {
    return /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(url);
  }
  function isYouTubeUrl(url: string | null) {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }
  
  

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineLarge" style={[styles.welcomeText, { color: theme.colors.onSurface }]}>
        Bienvenido al Universo NASA
      </Text>

      <View style={styles.imageWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <>
            <Image
              source={{ uri: (isValidImageUrl(imageUrl) && !isYouTubeUrl(imageUrl)) ? imageUrl! : 'https://wallpapers.com/images/hd/earth-from-outer-space-nay511rcxz64g178.jpg' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <Surface style={[styles.labelContainer, { backgroundColor: theme.colors.elevation.level1 }]}>
              <Text style={[styles.labelText, { color: theme.colors.onSurface }]}>Imagen del día</Text>
            </Surface>
          </>
        )}
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
          title="Más"
          iconName="rocket"
          backgroundColor={theme.colors.primary}
          onPress={() => navigation.navigate("explore")}
        />
        <NasaCard 
          title="Marte"
          iconName="globe"
          backgroundColor={theme.colors.primary}
          onPress={() => navigation.navigate("planets")}
        />
        
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
    marginTop: 35
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