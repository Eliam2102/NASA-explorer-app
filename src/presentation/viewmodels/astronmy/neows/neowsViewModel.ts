import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/global/store";

import { Asteroid } from "../../../../domain/entidades/astronomy/neows/asteroid";
import { GetAsteroidsPaginatedUseCase } from "../../../../domain/useCases/astronomy/neows/getAsteroidUseCase";
import { NeowsRepositoryImpl } from "../../../../data/repository_impl/astronomy/neows/neowsRepositoryImple";
import { NeowsOfflineRepository } from "../../../../domain/repository/astronomy/neows/getItemsNeowsOfflineRepository";

const useCaseInstance = new GetAsteroidsPaginatedUseCase(
  new NeowsRepositoryImpl(),
  new NeowsOfflineRepository()
);

export const useNeowsViewModel = (start_date: string, end_date: string) => {
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchAsteroids = async () => {
      setLoading(true);
      try {
        const response = await useCaseInstance.execute(start_date, end_date, isOffline);
        if (!isCancelled) {
          setAsteroids(response);
        }
      } catch (error: any) {
        if (!isCancelled) {
          setError(error.message ?? "Error desconocido");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchAsteroids();

    return () => {
      isCancelled = true;
    };
  }, [start_date, end_date, isOffline]);

  return {
    asteroids,
    loading,
    err,
    // refetch útil si quieres volver a llamar manualmente desde el componente
    refetch: () => useCaseInstance.execute(start_date, end_date, isOffline),
  };
};

// ✅ También exporta el hook para la fecha inicial
export const useInitialDateRange = () => {
  const today = new Date();
  const end = new Date();
  end.setDate(today.getDate() + 6); // rango de 7 días

  return {
    initialStartDate: today,
    initialEndDate: end,
  };
};