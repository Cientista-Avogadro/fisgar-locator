import { icon, latLng, LatLngExpression } from 'leaflet';
import { CSSProperties, useEffect, useState } from 'react';
import {MapContainer, Marker, Polygon, Popup, TileLayer, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import bulletIcon from '../../assets/img/bullet.png';
import { useSelector } from 'react-redux';

interface IProps {
  style?: CSSProperties;
}

const iconBullet = icon({
  iconUrl: bulletIcon,
  iconSize: [30, 30],
});

export const Maps = ({ style }: IProps) => {
  const adress_info = useSelector((state: any) => state.adressInfo);
  const [pos, setPos] = useState<LatLngExpression>([51.505, -0.09]);
  const selected: LatLngExpression = [
    Number(adress_info?.lat),
    Number(adress_info?.lon),
  ];

  useEffect(() => {
    if (adress_info) {
      setPos(selected);
    }
  }, [adress_info]);

  const ResetCenterView = () => {
    const Map = useMap();

    useEffect(() => {
      if (adress_info) {
        Map.setView(latLng(adress_info?.lat, adress_info?.lon), Map.getZoom(), {
          animate: true,
        });
      }
    }, [adress_info]);

    return null;
  };

  const polygon:any = adress_info?.geojson?.coordinates
  console.log(polygon)
  return (
    <MapContainer center={pos} zoom={13} style={style}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=wqJUQrlJwUVH8qGo4NK4'
      />
      {pos && (
        <Marker position={pos} icon={iconBullet}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      {
          polygon &&  <Polygon pathOptions={{color:'red'}} positions={polygon} />
      }

      <ResetCenterView />
    </MapContainer>
  );
};
