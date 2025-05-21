import { useState } from "react";
import { EpicImage } from "../../../domain/entidades/theme/epicTheme";
import { GetEpicImageUseCase } from "../../../domain/useCases/epic/getEpicImageUseCase";
import { EpicThemeRepositoryImpl } from "../../../data/repository_impl/epic/epicThemeRepositoryImpl";
import { EpicThemeOfflineRepository } from "../../../domain/repository/epic/epicThemeOfflineRepository";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/global/store";

export const useEpicViewModel = () => {
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  const [epicImages, setEpicImages] = useState<EpicImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Crear instancia del use case con ambos repositorios
  const getEpicImageUseCase = new GetEpicImageUseCase(
    new EpicThemeRepositoryImpl(),      
    new EpicThemeOfflineRepository() 
  );

  const fetchEpicImages = async (): Promise<EpicImage[]> => {
    setLoading(true);
    try {
      // Pasa isOffline al use case
      const response = await getEpicImageUseCase.execute(isOffline);
      setEpicImages(response);

      // Determina si es de noche para el tema
      if (response.length > 0) {
        const isNight = checkIfNight(response[0].date);
        setTheme(isNight ? "dark" : "light");
      }

      return response;
    } catch (error) {
      console.error("Error al obtener imágenes de EPIC:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const checkIfNight = (date: string): boolean => {
    const hour = new Date().getHours(); 
    return hour < 6 || hour >= 18;
  };

  return {
    epicImages,
    loading,
    theme,
    fetchEpicImages,
    isOffline,
  };
};
