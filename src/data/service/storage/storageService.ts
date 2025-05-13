// src/data/storage/StorageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const StorageService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const json = isWeb
        ? localStorage.getItem(key)
        : await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    const json = JSON.stringify(value);
    if (isWeb) {
      localStorage.setItem(key, json);
    } else {
      await AsyncStorage.setItem(key, json);
    }
  },

  async remove(key: string): Promise<void> {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};