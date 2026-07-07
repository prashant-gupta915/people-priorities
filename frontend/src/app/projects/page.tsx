import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectsView from '@/components/projects/ProjectsView';

export const metadata = {
  title: 'Projects & Monitoring – PeoplePriority',
  description: 'Track government scheme delivery, project progress, budgets, milestones and departmental accountability.',
};

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectsView />
    </DashboardLayout>
  );
}
