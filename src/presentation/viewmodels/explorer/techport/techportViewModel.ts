import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/global/store';

import { GetTechTransferUseCase } from '../../../../domain/useCases/explore/techport/getTechportUseCase';
import { TechTransferRepositoryImpl } from '../../../../data/repository_impl/explore/techport/techportRepositoryImpl';
import { TechportOfflineRepository } from '../../../../domain/repository/explore/tech/techportOfflineRepository';

import { Project } from '../../../../domain/entidades/explore/techport/techport';

// ViewModel para la pantalla de transferencia tecnológica
export const useTechTransferViewModel = (initialQuery: string) => {
  // Estados locales
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Estado global del modo offline desde Redux
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  // Instancia del caso de uso con ambos repositorios
  const useCase = new GetTechTransferUseCase(
    new TechTransferRepositoryImpl(),           // Repositorio en línea
    new TechportOfflineRepository()         // Repositorio offline
  );

  // Función para obtener datos según la página
  const fetchData = async (newPage: number) => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const fetchedProjects = await useCase.execute({ query: initialQuery, page: newPage }, isOffline);

      if (fetchedProjects.length === 0) {
        setHasMore(false);
      } else {
        setProjects(prev => [...prev, ...fetchedProjects]); // Append sin reiniciar
      }
    } catch (err) {
      console.error('Error al cargar proyectos', err);
      setError('Error al cargar los proyectos.');
    } finally {
      setLoading(false);
    }
  };

  // Se dispara al montar o al cambiar la página
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Función para cargar la siguiente página si hay más y no está cargando
  const loadNextPage = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { projects, loading, error, loadNextPage };
};