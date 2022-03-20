import { useState, useEffect } from 'react';

type GeolocationCoordinates = {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
};

type GeolocationPositionError = {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
};

type GeolocationPosition = {
  coords: GeolocationCoordinates;
  timestamp: number;
};

type PositionType = {
  latitude: number;
  longitude: number;
};

export const usePosition = (): any => {
  const [position, setPosition] = useState<PositionType>({} as PositionType);
  const [error, setError] = useState<string | null>(null);

  const onChange = (pos: GeolocationPosition): void => {
    // Здесь мы могли бы сохранить весь объект position, но для
    // ясности давайте явно перечислим, какие свойства нас интересуют.
    setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
  };

  const onError = (err: GeolocationPositionError): void => {
    setError(err.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      return;
    }

    // Подписываемся на изменение геопозиции браузера.
    const watcher = geo.watchPosition(onChange, onError);

    // В случае, если компонент будет удаляться с экрана
    // производим отписку от слежки, чтобы не засорять память.
    // eslint-disable-next-line consistent-return
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error };
};
