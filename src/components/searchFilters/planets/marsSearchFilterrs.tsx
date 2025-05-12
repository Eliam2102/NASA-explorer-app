import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (isSearching) return;
    
    setIsSearching(true);
    try {
      const filters = {
        solDate: parseInt(solDate, 10),
        camera,
        rover,
      };
      await onSearch(filters);
      setExpanded(false);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
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
            style={[styles.input, {backgroundColor: theme.colors.surface, color: theme.colors.onSurface}]}
            value={solDate}
            onChangeText={setSolDate}
            keyboardType="numeric"
            placeholder="Ej: 1000"
            placeholderTextColor={theme.colors.onSurface}
          />

          <Text style={[styles.label, {color: theme.colors.onSurface}]}>Rover:</Text>
          <View style={[styles.pickerContainer, {backgroundColor: theme.colors.surface}]}>
            <Picker
              selectedValue={rover}
              onValueChange={(itemValue) => setRover(itemValue)}
              style={{color: theme.colors.onSurface}}
            >
              <Picker.Item label="Selecciona un rover" value="" />
              <Picker.Item label="Curiosity" value="curiosity" />
              <Picker.Item label="Opportunity" value="opportunity" />
              <Picker.Item label="Spirit" value="spirit" />
            </Picker>
          </View>

          <Text style={[styles.label, {color: theme.colors.onSurface}]}>Camera:</Text>
          <View style={[styles.pickerContainer, {backgroundColor: theme.colors.surface}]}>
            <Picker
              selectedValue={camera}
              onValueChange={(itemValue) => setCamera(itemValue)}
              style={{color: theme.colors.onSurface}}
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

          <TouchableOpacity
            style={[
              styles.searchButton,
              {
                backgroundColor: theme.colors.primary,
                opacity: isSearching ? 0.7 : 1,
              }
            ]}
            onPress={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <ActivityIndicator color={theme.colors.onPrimary} />
            ) : (
              <Text style={[styles.searchButtonText, {color: theme.colors.onPrimary}]}>
                Buscar
              </Text>
            )}
          </TouchableOpacity>
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
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  searchButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MarsRoverFilters;