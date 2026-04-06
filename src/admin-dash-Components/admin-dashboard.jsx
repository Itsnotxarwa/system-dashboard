import { useEffect, useState } from "react";
import Overview from "./overview";
import Sidebar from "./sidebar";
import Tenants from "./tenants";
import CreateModal from "./tenants-components/createModal";

export default function AdminDashboard() {

    const [token] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      localStorage.setItem("token", urlToken);
      return urlToken;
    }
    return localStorage.getItem("token");
  });

  const [role] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRole = params.get("role");
    if (urlRole) {
      localStorage.setItem("role", urlRole);
      return urlRole;
    }
    return localStorage.getItem("role");
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    if (userId) localStorage.setItem("userId", userId);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [createdTenant, setCreatedTenant] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://api.voixup.fr/admin/tenants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "Authorization": `Bearer ${token}`  
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(`Error: ${data?.detail || "Failed to create tenant"}`);
        return;
      }

      setCreatedTenant(data);

    } catch (error) {
      console.error(error);
      alert(`Failed: ${error?.detail}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar role={role} />
      <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1">
        <div className="max-w-7xl mx-auto">
            <Overview setShowModal={setShowModal} />
            {showModal &&
            <CreateModal 
            setShowModal={setShowModal} 
            form={form} 
            setForm={setForm} 
            createdTenant={createdTenant}
            setCreatedTenant={setCreatedTenant}
            handleSubmit={handleSubmit} />
            }
            <Tenants />
        </div>
      </main>
    </div>
  )
}