import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileView from "@/components/profile/ProfileView";

export const metadata = {
  title: "MP Profile | People Priority",
  description: "View and manage Member of Parliament details.",
};

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <ProfileView />
    </DashboardLayout>
  );
}
