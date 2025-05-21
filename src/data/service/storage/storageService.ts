import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Verifica si está en entorno web y si localStorage está disponible
const isWeb = Platform.OS === 'web' && typeof localStorage !== 'undefined';

export const StorageService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const json = isWeb
        ? localStorage.getItem(key)
        : await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error(`StorageService.get error for key "${key}":`, error);
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      const json = JSON.stringify(value);
      if (isWeb) {
        localStorage.setItem(key, json);
      } else {
        await AsyncStorage.setItem(key, json);
      }
    } catch (error) {
      console.error(`StorageService.set error for key "${key}":`, error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      if (isWeb) {
        localStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`StorageService.remove error for key "${key}":`, error);
    }
  },
};