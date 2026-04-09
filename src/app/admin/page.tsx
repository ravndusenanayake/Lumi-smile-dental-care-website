import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | Lumi Smile Dental",
  description: "Manage appointments for Lumi Smile Dental Care.",
};

export default function AdminPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <AdminDashboard />
    </main>
  );
}
