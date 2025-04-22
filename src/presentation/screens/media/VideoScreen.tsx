import { View, Text, StyleSheet } from 'react-native';

export default function VideoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vista generica para videos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});