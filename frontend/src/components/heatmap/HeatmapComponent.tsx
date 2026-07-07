"use client";
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useHeatmapData } from '../../hooks/useHeatmapData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const setupLeaflet = () => {
  // @ts-expect-error
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });
};

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster'), { ssr: false });

export default function HeatmapComponent() {
  const { data: heatmapData, isLoading, error } = useHeatmapData();

  useEffect(() => {
    setupLeaflet();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-64 flex items-center justify-center text-red-500">
        Failed to load heatmap data.
      </div>
    );
  }

  const defaultPosition: [number, number] = [28.6139, 77.2090]; // Default to New Delhi if no data
  const center = heatmapData && heatmapData.length > 0
    ? [heatmapData[0].latitude, heatmapData[0].longitude] as [number, number]
    : defaultPosition;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 col-span-1 md:col-span-2">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Complaint Locations</h3>
      <div className="h-96 rounded overflow-hidden">
        <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup chunkedLoading>
            {heatmapData?.map((point, index) => (
              <Marker key={index} position={[point.latitude, point.longitude]}>
                <Popup>
                  <div>
                    <strong>Category:</strong> {point.category}<br />
                    <strong>Priority:</strong> {point.priority}<br />
                    <strong>Status:</strong> {point.status}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
