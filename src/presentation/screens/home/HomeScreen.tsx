import React from "react";
import { View, StyleSheet, Image, ScrollView, Text, Pressable } from "react-native";
import NasaCard from "../../../components/Cards/CardHome";
import { useNavigation } from '@react-navigation/native';


//Aqui creo mi componente pantalla de inicio "maquetación"
export default function HomeScreen() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Hero text */}
      <Text style={styles.welcomeText}>Bienvenido al Universo NASA</Text>

      {/* Región de bienvenida con imagen APOd*/}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: 'https://images-assets.nasa.gov/image/iss042e013697/iss042e013697~large.jpg' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Imagen del día</Text>
        </View>
      </View>

      {/* GRegión grid de 4 cards*/}
      <View style={styles.grid}>
        <NasaCard 
          title="Astronomía"
          iconName="meteor"
          backgroundColor="#0B3D91"
          onPress={() => {}}
        />
        <NasaCard 
          title="Multimedia"
          iconName="satellite-dish"
          backgroundColor="#0B3D91"
          onPress={() => {}}
        />
        <NasaCard 
          title="Noticias"
          iconName="satellite"
          backgroundColor="#0B3D91"
          onPress={() => {}}
        />
        <NasaCard 
          title="Planetas"
          iconName="globe"
          backgroundColor="#0B3D91"
          onPress={() => {}}
        />
      </View>

      {/* Región explorar más */}
      <Pressable style={styles.exploreMore} onPress={() => {}}>
        <Text style={styles.exploreText}>🔭 Explorar más</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0B3D91",
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
    backgroundColor: '#ffff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  labelText: {
    color: 'black',
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
    backgroundColor: "#E6EEF9",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 40,
  },
  exploreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B3D91",
  },
});