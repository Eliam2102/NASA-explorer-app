// import NetInfo from '@react-native-community/netinfo';
// import { Platform } from 'react-native';
// import { StorageService } from '../data/service/storage/storageService'; // Ajusta el path según tu estructura
// import { OFFLINE_KEY } from './constants/offlineKey';

// export async function isOnline(): Promise<boolean> {
//   const forcedOffline = await StorageService.get(OFFLINE_KEY);

//   // Si el usuario forzó el modo offline, devuelve false aunque haya conexión
//   if (forcedOffline === true || forcedOffline === 'true') {
//     return false;
//   }

//   // Si estás en web
//   if (Platform.OS === 'web') {
//     return navigator.onLine;
//   }

//   // Si no hay modo offline forzado, confía en NetInfo
//   const state = await NetInfo.fetch();
//   return !!state.isConnected;
// }