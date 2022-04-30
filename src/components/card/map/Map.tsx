import React, { useMemo } from 'react';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import moon from '../../../images/moon.svg';
import sun from '../../../images/sun.svg';
import { DataWeatherType } from '../../../state/dataReducer';
import { AppRootStateType } from '../../../state/store';
import { changeTemp } from '../../../utils/utils';

import style from './Map.module.scss';

type MapPropsType = {
  ID: string;
  min: number;
  max: number;
  name: string;
  image: string;
  selectedTempType: string;
  tempType: boolean;
};

export const Map = React.memo(
  ({ ID, min, max, name, image, selectedTempType, tempType }: MapPropsType) => {
    const city = useSelector<AppRootStateType, DataWeatherType[]>(
      state => state.dataReducer,
    );
    const currentCity = city.filter(town => town.id === ID);

    const position: [number, number] = [
      +`${currentCity[0].lat}`,
      +`${currentCity[0].lon}`,
    ];

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      className: style.marker,
    });

    const MapTemp = useMemo(
      () => ({
        min: changeTemp(tempType, Math.round(min)),
        max: changeTemp(tempType, Math.round(max)),
      }),
      [min, max, tempType],
    );

    const iconURL: string = `http://openweathermap.org/img/wn/${image}@4x.png`;

    return (
      <div className={style.main}>
        <div className={style.overlay}>
          <div className={style.column}>
            <div className={style.icon}>
              <img src={iconURL} alt="icon" />
            </div>
            <div className={style.title}>{name}</div>
            <div className={style.row}>
              <img className={style.image} src={sun} alt="day" />
              <span>{`${MapTemp.max} ${selectedTempType}`}</span>
            </div>
            <div className={style.row}>
              <img className={style.image} src={moon} alt="night" />
              <span>{`${MapTemp.min} ${selectedTempType}`}</span>
            </div>
          </div>
        </div>
        <div className={style.body}>
          <MapContainer
            center={position}
            zoom={8}
            style={{ height: '450px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
          </MapContainer>
        </div>
      </div>
    );
  },
);
