import { useState } from "react";
import { ApodItem } from "../../../../domain/entidades/astronomy/apod/apodItem";
import { GetItemsApodUseCase } from "../../../../domain/useCases/astronomy/apod/getItemsApodUseCase";
import { apodItemRepositoryImple } from "../../../../data/repository_impl/astronomy/apod/apodItemRepositoryImple";

export const useApodViewModel = () => {
  const [itemApod, setItemApod] = useState<ApodItem | null>(null);
  const [loading, setLoading] = useState(false);

  const getItemsApodUseCase = new GetItemsApodUseCase(new apodItemRepositoryImple());

  const fetchApodItem = async (date: string) => {
    setLoading(true);
    try {
      const response = await getItemsApodUseCase.execute(date);
      console.log("📸 APOD recibido:", response);
      setItemApod(response);
      return response;
    } catch (error) {
      console.error("Error al obtener la imagen de APOD: ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    itemApod,
    loading,
    fetchApodItem,
  };
};