import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private static instance: AxiosInstance | null = null;

  private constructor(baseURL: string) {
    ApiService.instance = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Le pasas la baseURL la primera vez
  public static getInstance(baseURL?: string): AxiosInstance {
    if (!ApiService.instance) {
      if (!baseURL) {
        throw new Error("ApiService no ha sido inicializado. Se requiere baseURL.");
      }
      new ApiService(baseURL);
    }
    return ApiService.instance!;
  }

  // Método para reiniciar la instancia si necesitas cambiar de API
  public static resetInstance(): void {
    ApiService.instance = null;
  }
}

export default ApiService;
