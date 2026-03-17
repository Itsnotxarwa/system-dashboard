import { useEffect } from "react";
import ConfigViewer from "./configViewer";
import Overview from "./overview";
import Sidebar from "./sidebar";
import Tenants from "./tenants";

export default function AdminDashboard() {
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const role = params.get("role");
      const userId = params.get("userId");

      if (token) localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      if (userId) localStorage.setItem("userId", userId);

      if (!token) window.location.href = "/"; 
    }, []);

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