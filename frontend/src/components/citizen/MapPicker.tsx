"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Standard Next.js + Leaflet icon 404 fix:
// Delete the broken _getIconUrl that references relative CSS image paths,
// then explicitly point to the CDN images.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


interface MapPickerProps {
  latitude?: number;
  longitude?: number;
  onChange: (lat: number, lng: number) => void;
}

const LocationMarker = ({ position, setPosition }: { position: L.LatLng | null, setPosition: (p: L.LatLng) => void }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

export default function MapPicker({ latitude, longitude, onChange }: MapPickerProps) {
  const defaultCenter: [number, number] = [51.505, -0.09]; // Default to London mock
  const center: [number, number] = latitude && longitude ? [latitude, longitude] : defaultCenter;

  return (
    <div className="h-64 w-full z-0 relative">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          position={latitude && longitude ? new L.LatLng(latitude, longitude) : null} 
          setPosition={(p) => onChange(p.lat, p.lng)} 
        />
      </MapContainer>
    </div>
  );
}
