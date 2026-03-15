import ConfigViewer from "./configViewer";
import Overview from "./overview";
import Sidebar from "./sidebar";
import Tenants from "./tenants";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar />
      <main className="bg-gray-50 flex-1">
        <Overview />
        <Tenants />
        <ConfigViewer />
      </main>
    </div>
  )
}