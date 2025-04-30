import { Asteroid } from "../../../../domain/entidades/neows/asteroid";
import { useState } from "react";
import { GetAsteroidsPaginatedUseCase } from '../../../../domain/useCases/astronomy/neows/getAsteroidUseCase';
import { NeowsRepositoryImpl } from "../../../../data/repository_impl/astronomy/neows/neowsRepositoryImple";

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const useInitialDateRange = () => {
  const today = new Date();
  const end = new Date();
  end.setDate(today.getDate() + 6);

  return {
    initialStartDate: today,
    initialEndDate: end,
  };
};

export const neowsViewModel = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);
  const [loading, isLoading] = useState(false);

  const getAsteroidsPaginatedUseCase = new GetAsteroidsPaginatedUseCase(new NeowsRepositoryImpl());

  const fecthAsteroidItems = async (start_date: string, end_date: string) => {
    isLoading(true);
    try {
      const response = await getAsteroidsPaginatedUseCase.execute(start_date, end_date);
      console.log('DATE DE OBJETOS CERCANOS: ', response);
      setAsteroids(response);
      return response;
    } catch (error) {
      console.error('Error al obtener asteroides: ', error);
    } finally {
      isLoading(false);
    }
  };

  return {
    asteroids,
    loading,
    fecthAsteroidItems,
  };
};