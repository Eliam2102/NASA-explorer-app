import React, { useEffect, useRef } from "react";
import {View,Text,StyleSheet,TouchableOpacity,Animated} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface NoResultsScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const EmptyResults: React.FC<NoResultsScreenProps> = ({
  title = "No hay resultados",
  message = "Intenta con otros filtros o vuelve a buscar.",
  onRetry,
}) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación que se ejecuta solo 3 veces con un intervalo
    const animate = () => {
      Animated.sequence([
        // Primer shake
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -1,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]),
        // Pausa de 1 segundo
        Animated.delay(1000),
        // Segundo shake
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 0.8,
            duration: 40,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -0.8,
            duration: 40,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 40,
            useNativeDriver: true,
          }),
        ]),
        // Pausa de 1.5 segundos
        Animated.delay(1500),
        // Tercer shake (más suave)
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 0.5,
            duration: 30,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -0.5,
            duration: 30,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 30,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    };

    // Iniciar la animación cuando el componente se monta
    animate();
    
    // Opcional: Repetir la secuencia completa cada 8 segundos
    const interval = setInterval(animate, 8000);
    
    return () => clearInterval(interval);
  }, [shakeAnim]);

  const shakeStyle = {
    transform: [
      {
        translateX: shakeAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: [-8, 8], // Rango un poco más amplio para mejor visibilidad
        }),
      },
      {
        rotate: shakeAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: ["-3deg", "3deg"], // Pequeña rotación para efecto más natural
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconWrapper, shakeStyle]}>
        <MaterialIcons name="report-problem" size={80} color="#FF3B30" />
      </Animated.View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={onRetry}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Volver a intentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 200,
  },
  iconWrapper: {
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});