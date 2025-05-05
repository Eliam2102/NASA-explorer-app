import React, { useState } from 'react';
import {View,StyleSheet,TouchableOpacity } from 'react-native';
import { useTheme, Text, TextInput, Surface } from 'react-native-paper';
//props de los filstro (compoentne)
interface Props {
  onSearch: (filters: any) => void;
}

//establecer formato clave valor, para las opciones filtro
const filterOptions = [
  { label: 'Palabra clave', key: 'query' },
  { label: 'Descripción', key: 'description' },
  { label: 'Título', key: 'title' },
  { label: 'Centro', key: 'center' },
  { label: 'Palabras clave', key: 'keywords' },
  { label: 'Rango de años', key: 'yearRange' },
];


//declaro mi compoente como tal
export const SearchFilters = ({ onSearch }: Props) => {
  // manejo del tema
  const theme = useTheme();
  //constantes para poder mnajear el estado 
  const [collapsed, setCollapsed] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('query');
  const [inputValue, setInputValue] = useState('');
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');

  //manejador de losfiltros para darle submit
  const handleSubmit = () => {
    const filters: any = { mediaType: 'image' };

    if (selectedFilter === 'yearRange') {
      if (yearStart) filters.yearStart = yearStart;
      if (yearEnd) filters.yearEnd = yearEnd;
    } else {
      filters[selectedFilter] = inputValue;
    }

    onSearch(filters);
    setCollapsed(true);//este es para ocultar los filtros para cuando se realice una busqueda
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.toggleButton]}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text style={[styles.toggleButtonText,{color: theme.colors.onSurface}]}>
          {collapsed ? 'Mostrar filtros' : 'Ocultar filtros'}
        </Text>
      </TouchableOpacity>

      {!collapsed && (
        <View style={styles.filtersContainer}>
          <Text style={[styles.label, {color: theme.colors.primary}]}>Filtrar por:</Text>

          {filterOptions.map((option) => (
            <TouchableOpacity
            key={option.key}
            onPress={() => setSelectedFilter(option.key)}
            style={[
              styles.option,
              { color: theme.colors.secondary }, 
              selectedFilter === option.key && styles.selectedOption, // solo si está seleccionado
            ]}
          >
            <Text style={[styles.optionText, { color: theme.colors.textPrimary }]}>
              {option.label}
            </Text>
          </TouchableOpacity>
          ))}

          {selectedFilter === 'yearRange' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Año de inicio"
                keyboardType="numeric"
                value={yearStart}
                onChangeText={setYearStart}
              />
              <TextInput
                style={styles.input}
                placeholder="Año de fin"
                keyboardType="numeric"
                value={yearEnd}
                onChangeText={setYearEnd}
              />
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Escriba su búsqueda"
              value={inputValue}
              onChangeText={setInputValue}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 6,
    alignItems: 'left',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  filtersContainer: {
    marginTop: 10,
  },
  label: { fontWeight: 'bold', marginBottom: 8 },
  option: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#8AB4F8',
    marginBottom: 5,
  },
  selectedOption: { backgroundColor: '#007aff' },
  optionText: { color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});