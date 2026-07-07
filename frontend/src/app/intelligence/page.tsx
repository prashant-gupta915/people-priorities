import DashboardLayout from '@/components/layout/DashboardLayout';
import IntelligenceMapView from '@/components/intelligence/IntelligenceMapView';

export const metadata = {
  title: 'Intelligence Map – PeoplePriority',
  description: 'Interactive geo-intelligence map showing complaint heatmap, hotspot analysis, and clustered complaint markers across the constituency.',
};

export default function IntelligencePage() {
  return (
    <DashboardLayout noPadding>
      <IntelligenceMapView />
    </DashboardLayout>
  );
}
