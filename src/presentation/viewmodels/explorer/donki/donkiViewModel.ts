import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';

// UseCases
import { GetAlertsUseCase } from '../../../../domain/useCases/explore/donki/getAlertsUseCase';
import { GetGeomagneticStormsUseCase } from '../../../../domain/useCases/explore/donki/getGeomagneticStorm';
import { GetRadiationEventsUseCase } from '../../../../domain/useCases/explore/donki/getRadiationUseCase';
import { GetSolarFlaresUseCase } from '../../../../domain/useCases/explore/donki/getSolarEventsUseCase';

// Repositories
import { NotificationSpaceWeatherRepositoryImpl } from '../../../../data/repository_impl/explore/donki/alertsRepositoryImple';
import { GeomagneticStormRepositoryImpl } from '../../../../data/repository_impl/explore/donki/geomagneticRepositoryImpl';
import { RadiationRepositoryImpl } from '../../../../data/repository_impl/explore/donki/radiationRepositoryImpl';
import { SolarRepositoryImpl } from '../../../../data/repository_impl/explore/donki/solarRepositoryImple';
import { SpaceWeatherAlert } from '../../../../domain/entidades/explore/donki/notification';
import { GeomagneticStorm } from '../../../../domain/entidades/explore/donki/geomagnetic';
import { RadiationEvent } from '../../../../domain/entidades/explore/donki/radiation';
import { SolarFlare } from '../../../../domain/entidades/explore/donki/solar';

export const useDonkiViewModel = () => {
  const [alerts, setAlerts] = useState<SpaceWeatherAlert[]>([]);
  const [storms, setStorms] = useState<GeomagneticStorm[]>([]);
  const [radiation, setRadiation] = useState<RadiationEvent[]>([]);
  const [solarFlares, setSolarFlares] = useState<SolarFlare[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const endDate = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      const alertUseCase = new GetAlertsUseCase(new  NotificationSpaceWeatherRepositoryImpl());
      const stormUseCase = new GetGeomagneticStormsUseCase(new GeomagneticStormRepositoryImpl());
      const radiationUseCase = new GetRadiationEventsUseCase(new RadiationRepositoryImpl());
      const solarUseCase = new GetSolarFlaresUseCase(new SolarRepositoryImpl());

      try {
        const [alertData, stormData, radiationData, solarData] = await Promise.all([
          alertUseCase.execute(startDate, endDate),
          stormUseCase.execute(startDate, endDate),
          radiationUseCase.execute(startDate, endDate),
          solarUseCase.execute(startDate, endDate),
        ]);

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
  }, []);

  return { alerts, storms, radiation, solarFlares, loading, error };
};