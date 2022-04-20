import React from 'react';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { DataWeatherType } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { Handle } from '../handle/Handle';

import style from './Map.module.scss';

export const Map = React.memo(() => {
  const city = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const position: [number, number] = [+`${city[0].lat}`, +`${city[0].lon}`];

  L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  return (
    <div className={style.main}>
      <div className={style.body}>
        <MapContainer
          center={position}
          zoom={12}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className={style.controls}>
        <Handle />
      </div>
    </div>
  );
});
