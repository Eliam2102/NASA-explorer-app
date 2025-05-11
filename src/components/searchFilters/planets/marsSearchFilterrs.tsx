import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from 'react-native-paper';

interface Props {
  onSearch: (filters: any) => void;
}

const MarsRoverFilters: React.FC<Props> = ({ onSearch }) => {
  const theme = useTheme();
  const [solDate, setSolDate] = useState('');
  const [camera, setCamera] = useState('');
  const [rover, setRover] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSearch = () => {
    const filters = {
      solDate: parseInt(solDate, 10),
      camera,
      rover,
    };
    onSearch(filters);
  };

  return (
    <View style={[styles.wrapper, {backgroundColor: theme.colors.background}]}>
      <TouchableOpacity
        style={[styles.toggleButton]}
        onPress={() => setExpanded((prev) => !prev)}
      >
        <Text style={[styles.toggleText, {color: theme.colors.onSurface}]}>
          {expanded ? 'Ocultar filtros' : 'Mostrar filtros'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={[, {backgroundColor: theme.colors.background}]}>
          <Text style={[styles.label, {color: theme.colors.onSurface}]}>Sol Date:</Text>
          <TextInput
            style={styles.input}
            value={solDate}
            onChangeText={setSolDate}
            keyboardType="numeric"
            placeholder="Ej: 1000"
          />

          <Text style={[styles.label, {color: theme.colors.onSurface}]}>Rover:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rover}
              onValueChange={(itemValue) => setRover(itemValue)}
            >
              <Picker.Item label="Selecciona un rover" value="" />
              <Picker.Item label="Curiosity" value="curiosity" />
              <Picker.Item label="Opportunity" value="opportunity" />
              <Picker.Item label="Spirit" value="spirit" />
            </Picker>
          </View>

          <Text style={[styles.label, {color: theme.colors.onSurface}]}>Camera:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={camera}
              onValueChange={(itemValue) => setCamera(itemValue)}
            >
              <Picker.Item label="Selecciona una cámara" value="" />
              <Picker.Item label="FHAZ - Front Hazard Avoidance" value="FHAZ" />
              <Picker.Item label="RHAZ - Rear Hazard Avoidance" value="RHAZ" />
              <Picker.Item label="NAVCAM - Navigation Camera" value="NAVCAM" />
              <Picker.Item label="MAST - Mast Camera" value="MAST" />
              <Picker.Item label="CHEMCAM - Chemistry Camera" value="CHEMCAM" />
              <Picker.Item label="MAHLI - Mars Hand Lens Imager" value="MAHLI" />
              <Picker.Item label="MARDI - Mars Descent Imager" value="MARDI" />
              <Picker.Item label="PANCAM - Panoramic Camera" value="PANCAM" />
              <Picker.Item label="MINITES - Thermal Spectrometer" value="MINITES" />
            </Picker>
          </View>

          <Button title="Buscar" onPress={handleSearch} color={theme.colors.surface} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 12,
    padding: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  toggleButton: {
    alignItems: 'center',
    marginBottom: 5,
  },
  toggleText: {
    alignSelf: 'left',
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default MarsRoverFilters;