import { useState, useEffect } from "react";
import { EpicImage } from "../../../domain/entidades/theme/epicTheme";
import { GetEpicImageUseCase } from "../../../domain/useCases/epic/getEpicImageUseCase";
import { EpicThemeRepositoryImpl } from "../../../data/repository_impl/epic/epicThemeRepositoryImpl";


export const useEpicViewModel = () => {
  const [epicImages, setEpicImages] = useState<EpicImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null); // importante

  const getEpicImageUseCase = new GetEpicImageUseCase(new EpicThemeRepositoryImpl());

  const fetchEpicImages = async (): Promise<EpicImage[]> => {
    setLoading(true);
    try {
      const response = await getEpicImageUseCase.execute();
      console.log("🌍 EPIC imágenes recibidas:", response);

      setEpicImages(response);

      // Si hay al menos una imagen, determinamos si es noche
      if (response.length > 0) {
        const isNight = checkIfNight(response[0].date);
        setTheme(isNight ? "dark" : "light");
      }

      return response;
    } catch (error) {
      console.error("❌ Error al obtener imágenes de EPIC: ", error);
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
  };
};