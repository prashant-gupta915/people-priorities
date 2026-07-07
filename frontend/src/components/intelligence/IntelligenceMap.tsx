"use client";

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import type { HeatmapPoint } from '../../types/analytics';

// ── Leaflet icon fix ────────────────────────────────────────────────────────
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

function fixLeafletIcons() {
  // @ts-expect-error – Leaflet icon URL fix
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });
}

// ── Category colours ────────────────────────────────────────────────────────
export const CATEGORY_COLORS: Record<string, string> = {
  Water: '#3B82F6',
  Road: '#F59E0B',
  Healthcare: '#EF4444',
  Education: '#8B5CF6',
  Electricity: '#FBBF24',
  Sanitation: '#10B981',
  Drainage: '#06B6D4',
  Employment: '#EC4899',
  Others: '#6B7280',
};

const PRIORITY_INTENSITY: Record<string, number> = {
  Critical: 0.9,
  High: 0.7,
  Medium: 0.45,
  Low: 0.25,
};

// ── Coloured DivIcon sized by priority ──────────────────────────────────────
function makeMarkerIcon(category: string, priority: string) {
  const color = CATEGORY_COLORS[category] ?? '#6B7280';
  const size = priority === 'Critical' ? 16 : priority === 'High' ? 13 : 10;
  const glow = priority === 'Critical'
    ? `0 0 8px ${color}80, 0 2px 6px rgba(0,0,0,0.35)`
    : '0 2px 6px rgba(0,0,0,0.3)';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:2.5px solid white;
      border-radius:50%;
      box-shadow:${glow};
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// ── Zoom controls component (inside MapContainer) ────────────────────────────
function ZoomControls() {
  const map = useMap();
  return (
    <div className="absolute top-20 right-4 z-[1000] flex flex-col gap-1">
      <button
        onClick={() => map.zoomIn()}
        className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-[#374151] hover:bg-[#F3F4F6] text-xl font-bold border border-[#E5E7EB] transition-colors"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-[#374151] hover:bg-[#F3F4F6] text-xl font-bold border border-[#E5E7EB] transition-colors"
        aria-label="Zoom out"
      >
        −
      </button>
      <button
        onClick={() => map.setView([28.6139, 77.209], 11)}
        title="Reset view"
        aria-label="Reset view"
        className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-[#374151] hover:bg-[#F3F4F6] text-base border border-[#E5E7EB] transition-colors"
      >
        ⊙
      </button>
    </div>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────
export interface EnrichedPoint extends HeatmapPoint {
  id: string;
  title: string;
  ward: string;
  submittedAt: string;
}

interface IntelligenceMapProps {
  points: EnrichedPoint[];
  /** Category strings to show (empty array = show all) */
  activeCategoryValues: string[];
  /** Free-text search query — filters by title, category, ward */
  searchQuery: string;
  showHeatmap: boolean;
  onMarkerClick: (point: EnrichedPoint) => void;
}

// ── Main map component ───────────────────────────────────────────────────────
export default function IntelligenceMap({
  points,
  activeCategoryValues,
  searchQuery,
  showHeatmap,
  onMarkerClick,
}: IntelligenceMapProps) {
  const mapReady = useRef(false);

  useEffect(() => {
    if (!mapReady.current) {
      fixLeafletIcons();
      mapReady.current = true;
    }
  }, []);

  const center: [number, number] =
    points.length > 0
      ? [points[0].latitude, points[0].longitude]
      : [28.6139, 77.209];

  // Apply category filter
  const categoryFiltered =
    activeCategoryValues.length === 0
      ? points
      : points.filter((p) => activeCategoryValues.includes(p.category));

  // Apply search filter
  const q = searchQuery.toLowerCase().trim();
  const visiblePoints =
    q === ''
      ? categoryFiltered
      : categoryFiltered.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.ward.toLowerCase().includes(q)
        );

  return (
    <MapContainer
      center={center}
      zoom={11}
      zoomControl={false}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Heatmap overlay — translucent circles per point, sized by intensity */}
      {showHeatmap &&
        visiblePoints.map((point) => {
          const intensity = PRIORITY_INTENSITY[point.priority] ?? 0.4;
          const color = CATEGORY_COLORS[point.category] ?? '#6B7280';
          return (
            <Circle
              key={`heat-${point.id}`}
              center={[point.latitude, point.longitude]}
              radius={900}
              pathOptions={{
                stroke: false,
                fillColor: color,
                fillOpacity: intensity * 0.32,
              }}
            />
          );
        })}

      {/* Clustered complaint markers */}
      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
        maxClusterRadius={48}
      >
        {visiblePoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={makeMarkerIcon(point.category, point.priority)}
            eventHandlers={{ click: () => onMarkerClick(point) }}
          >
            <Popup maxWidth={260}>
              <div className="p-1 space-y-1.5 font-sans">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[point.category] ?? '#6B7280' }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#6B7280]">
                    {point.category}
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-[#111827] leading-snug">
                  {point.title}
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span
                    className={`px-1.5 py-0.5 rounded font-semibold ${
                      point.priority === 'Critical'
                        ? 'bg-red-100 text-red-700'
                        : point.priority === 'High'
                        ? 'bg-orange-100 text-orange-700'
                        : point.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {point.priority}
                  </span>
                  <span className="px-1.5 py-0.5 rounded font-medium bg-gray-100 text-gray-600">
                    {point.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7280]">Ward: {point.ward}</p>
                <p className="text-[11px] text-[#9CA3AF]">{point.submittedAt}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Custom zoom + reset controls */}
      <ZoomControls />
    </MapContainer>
  );
}
