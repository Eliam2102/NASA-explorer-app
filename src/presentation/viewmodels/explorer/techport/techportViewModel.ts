import { useState, useEffect } from 'react';
import { GetTechTransferUseCase } from '../../../../domain/useCases/explore/techport/getTechportUseCase';
import { TechTransferRepositoryImpl } from '../../../../data/repository_impl/explore/techport/techportRepositoryImpl';
import { Params } from '../../../../domain/repository/planets/types/types';
import { Project } from '../../../../domain/entidades/explore/techport/techport';

export const useTechTransferViewModel = (params: Params) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const useCase = new GetTechTransferUseCase(new TechTransferRepositoryImpl());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedProjects = await useCase.execute(params);
        setProjects(fetchedProjects);
      } catch (err) {
        console.error('error al cargar proyectos', err)
        setError('Error al cargar los proyectos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { projects, loading, error };
};
