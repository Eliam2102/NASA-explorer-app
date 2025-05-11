import { useState, useEffect } from 'react';
import { GetTechTransferUseCase } from '../../../../domain/useCases/explore/techport/getTechportUseCase';
import { TechTransferRepositoryImpl } from '../../../../data/repository_impl/explore/techport/techportRepositoryImpl';
import { Project } from '../../../../domain/entidades/explore/techport/techport';

export const useTechTransferViewModel = (initialQuery: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const useCase = new GetTechTransferUseCase(new TechTransferRepositoryImpl());

  const fetchData = async (newPage: number) => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const fetchedProjects = await useCase.execute({ query: initialQuery, page: newPage });

      if (fetchedProjects.length === 0) {
        setHasMore(false);
      } else {
        setProjects(prev => [...prev, ...fetchedProjects]); // Esto agrega los proyectos sin reiniciar
      }
    } catch (err) {
      console.error('Error al cargar proyectos', err);
      setError('Error al cargar los proyectos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]); // Solo se dispara cuando la página cambia

  const loadNextPage = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1); // Incrementar la página solo cuando es necesario
    }
  };

  return { projects, loading, error, loadNextPage };
};
