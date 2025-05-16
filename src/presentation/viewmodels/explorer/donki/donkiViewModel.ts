import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/global/store';
import { format, subDays } from 'date-fns';

// UseCases
import { GetAlertsUseCase } from '../../../../domain/useCases/explore/donki/getAlertsUseCase';
import { GetGeomagneticStormsUseCase } from '../../../../domain/useCases/explore/donki/getGeomagneticStorm';
import { GetRadiationEventsUseCase } from '../../../../domain/useCases/explore/donki/getRadiationUseCase';
import { GetSolarFlaresUseCase } from '../../../../domain/useCases/explore/donki/getSolarEventsUseCase';

// Repositorios ONLINE
import { NotificationSpaceWeatherRepositoryImpl } from '../../../../data/repository_impl/explore/donki/alertsRepositoryImple';
import { GeomagneticStormRepositoryImpl } from '../../../../data/repository_impl/explore/donki/geomagneticRepositoryImpl';
import { RadiationRepositoryImpl } from '../../../../data/repository_impl/explore/donki/radiationRepositoryImpl';
import { SolarRepositoryImpl } from '../../../../data/repository_impl/explore/donki/solarRepositoryImple';

// Repositorios OFFLINE
import { NotificationSpaceWeatherOfflineRepository } from '../../../../domain/repository/explore/donki/notification/notificationOfflineRepository';
import { GeomagneticStormOfflineRepository } from '../../../../domain/repository/explore/donki/magneticStorm/magneticStormOfflineRepository';
import { RadiationOfflineRepository } from '../../../../domain/repository/explore/donki/radiation/radiationOfflineRepository';
import { SolarRepositoryOffline } from '../../../../domain/repository/explore/donki/solar/solarOfflineRepository';

// Entidades del dominio
import { SpaceWeatherAlert } from '../../../../domain/entidades/explore/donki/notification';
import { GeomagneticStorm } from '../../../../domain/entidades/explore/donki/geomagnetic';
import { RadiationEvent } from '../../../../domain/entidades/explore/donki/radiation';
import { SolarFlare } from '../../../../domain/entidades/explore/donki/solar';

export const useDonkiViewModel = () => {
  // Estados para cada tipo de evento
  const [alerts, setAlerts] = useState<SpaceWeatherAlert[]>([]);
  const [storms, setStorms] = useState<GeomagneticStorm[]>([]);
  const [radiation, setRadiation] = useState<RadiationEvent[]>([]);
  const [solarFlares, setSolarFlares] = useState<SolarFlare[]>([]);

  // Estados generales de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Acceder a la bandera offline desde Redux
  const isOffline = useSelector((state: RootState) => state.offline.isOffline);

  // Fechas de consulta (últimos 30 días)
  const startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const endDate = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      // Instancias de casos de uso con ambos repositorios
      const alertUseCase = new GetAlertsUseCase(
        new NotificationSpaceWeatherRepositoryImpl(),
        new NotificationSpaceWeatherOfflineRepository()
      );

      const stormUseCase = new GetGeomagneticStormsUseCase(
        new GeomagneticStormRepositoryImpl(),
        new GeomagneticStormOfflineRepository()
      );

      const radiationUseCase = new GetRadiationEventsUseCase(
        new RadiationRepositoryImpl(),
        new RadiationOfflineRepository()
      );

      const solarUseCase = new GetSolarFlaresUseCase(
        new SolarRepositoryImpl(),
        new SolarRepositoryOffline()
      );

      try {
        // Ejecutar los casos de uso en paralelo
        const [alertData, stormData, radiationData, solarData] = await Promise.all([
          alertUseCase.execute(startDate, endDate, isOffline),
          stormUseCase.execute(startDate, endDate, isOffline),
          radiationUseCase.execute(startDate, endDate, isOffline),
          solarUseCase.execute(startDate, endDate, isOffline),
        ]);

        // Actualizar los estados
        setAlerts(alertData);
        setStorms(stormData);
        setRadiation(radiationData);
        setSolarFlares(solarData);
      } catch (err) {
        setError('Ocurrió un error al cargar los eventos DONKI.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [isOffline]); // Si cambia el modo offline, vuelve a cargar los datos

  return {
    alerts,
    storms,
    radiation,
    solarFlares,
    loading,
    error,
  };
};