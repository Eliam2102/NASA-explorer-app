import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTheme, Text, TextInput } from 'react-native-paper';

// Tipado de las props esperadas
interface Props {
  onSearch: (filters: any) => void;
}

// Opciones disponibles para filtrar, cada una tiene un label y una clave
const filterOptions = [
  { label: 'Palabra clave', key: 'query' },
  { label: 'Descripción', key: 'description' },
  { label: 'Título', key: 'title' },
  { label: 'Centro', key: 'center' },
  { label: 'Palabras clave', key: 'keywords' },
  { label: 'Rango de años', key: 'yearRange' },
];

export const SearchFilters = ({ onSearch }: Props) => {
  const theme = useTheme();

  // Controla si el panel de filtros está abierto o colapsado
  const [collapsed, setCollapsed] = useState(true);

  // Filtro actualmente seleccionado
  const [selectedFilter, setSelectedFilter] = useState('query');

  // Hook principal para controlar el formulario
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inputValue: '',
      yearStart: '',
      yearEnd: '',
    },
  });

  // Observamos los años ingresados para validación cruzada
  const yearStart = watch('yearStart');
  const yearEnd = watch('yearEnd');

  // Función ejecutada al enviar el formulario
  const onSubmit = (data: any) => {
    const filters: any = { mediaType: 'image' };

    if (selectedFilter === 'yearRange') {
      if (data.yearStart) filters.yearStart = data.yearStart;
      if (data.yearEnd) filters.yearEnd = data.yearEnd;
    } else {
      filters[selectedFilter] = data.inputValue;
    }

    onSearch(filters);
    setCollapsed(true);
    reset(); // Limpiamos el formulario después de buscar
  };

  return (
    <View style={styles.container}>
      {/* Botón para mostrar u ocultar los filtros */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text style={[styles.toggleButtonText, { color: theme.colors.onSurface }]}>
          {collapsed ? 'Mostrar filtros' : 'Ocultar filtros'}
        </Text>
      </TouchableOpacity>

      {/* Contenedor de filtros, visible solo si no está colapsado */}
      {!collapsed && (
        <View style={styles.filtersContainer}>
          <Text style={[styles.label, { color: theme.colors.primary }]}>Filtrar por:</Text>

          {/* Botones de selección de filtros */}
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => setSelectedFilter(option.key)}
              style={[
                styles.option,
                selectedFilter === option.key && styles.selectedOption,
              ]}
            >
              <Text style={[styles.optionText, { color: theme.colors.onBackground }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Inputs según el tipo de filtro seleccionado */}
          {selectedFilter === 'yearRange' ? (
            <>
              {/* Año de inicio */}
              <Controller
                control={control}
                name="yearStart"
                rules={{
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: 'Año inválido (debe ser numérico de 4 dígitos)',
                  },
                  validate: (value) =>
                    !yearEnd || parseInt(value) <= parseInt(yearEnd) ||
                    'El año de inicio debe ser menor o igual al año de fin',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Año de inicio"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.yearStart}
                    mode="outlined"
                  />
                )}
              />
              {errors.yearStart && (
                <Text style={styles.errorText}>{errors.yearStart.message}</Text>
              )}

              {/* Año de fin */}
              <Controller
                control={control}
                name="yearEnd"
                rules={{
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: 'Año inválido (debe ser numérico de 4 dígitos)',
                  },
                  validate: (value) =>
                    !yearStart || parseInt(value) >= parseInt(yearStart) ||
                    'El año de fin debe ser mayor o igual al año de inicio',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Año de fin"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.yearEnd}
                    mode="outlined"
                  />
                )}
              />
              {errors.yearEnd && (
                <Text style={styles.errorText}>{errors.yearEnd.message}</Text>
              )}
            </>
          ) : (
            // Campo genérico para los filtros de texto
            <Controller
              control={control}
              name="inputValue"
              rules={{
                required: 'Este campo es requerido',
                minLength: {
                  value: 2,
                  message: 'Debe tener al menos 2 caracteres',
                },
                pattern: {
                  value: /^[a-zA-Z0-9\s.,-áéíóúüñÁÉÍÓÚÜÑ]*$/,
                  message: 'No se permiten caracteres especiales',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Escriba su búsqueda"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.inputValue}
                  mode="outlined"
                />
              )}
            />
          )}
          {errors.inputValue && (
            <Text style={styles.errorText}>{errors.inputValue.message}</Text>
          )}

          {/* Botón para ejecutar la búsqueda */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: 'flex-start',
  },
  toggleButtonText: {
    fontWeight: '600',
  },
  filtersContainer: {
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#8AB4F8',
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: '#007aff',
  },
  optionText: {
    color: '#333',
  },
  input: {
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#fff',
    height: 42, // más compacto
    fontSize: 14,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});
