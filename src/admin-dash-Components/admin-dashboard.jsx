import ConfigViewer from "./configViewer";
import Overview from "./overview";
import Sidebar from "./sidebar";
import Tenants from "./tenants";

export default function AdminDashboard() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const role = params.get("role");
  const userId = params.get("userId");
  
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userId", userId);

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