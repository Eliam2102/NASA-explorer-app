import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/global/store";

import { ApodItem } from "../../../../domain/entidades/astronomy/apod/apodItem";
import { GetItemsApodUseCase } from "../../../../domain/useCases/astronomy/apod/getItemsApodUseCase";
import { apodItemRepositoryImple } from "../../../../data/repository_impl/astronomy/apod/apodItemRepositoryImple";
import { ApodItemOfflineRepository } from "../../../../domain/repository/astronomy/apod/getItemsApodOfflineRepository";

// instancia fuera del hook (importante para evitar recreación en cada render)
const useCaseInstance = new GetItemsApodUseCase(
  new apodItemRepositoryImple(),
  new ApodItemOfflineRepository()
);

export const useApodViewModel = (date: string) => {
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);
  const [itemApod, setItemApod] = useState<ApodItem | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchApodItem = useCallback(async () => {
    setLoading(true);
    try {
      const response = await useCaseInstance.execute(date, isOffline);
      console.log("APOD recibido:", response);
      setItemApod(response);
    } catch (error) {
      console.error("Error al obtener la imagen de APOD:", error);
    } finally {
      setLoading(false);
    }
  }, [date, isOffline]);

  useEffect(() => {
    fetchApodItem();
  }, [fetchApodItem]);

  return {
    itemApod,
    loading,
    refetch: fetchApodItem,
    isOffline,
  };
};
