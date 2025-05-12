import axios, { AxiosInstance } from 'axios';

// Servicio Singleton
export class ApiService {
  private static instance: AxiosInstance | null = null;

  public static getInstance(baseURL?: string): AxiosInstance {
    if (!ApiService.instance) {
      ApiService.instance = axios.create({
        baseURL,
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return ApiService.instance;
  }

  public static resetInstance(): void {
    ApiService.instance = null;
  }
}

//  NUEVA función para crear una instancia independiente
export function createApiInstance(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });
}