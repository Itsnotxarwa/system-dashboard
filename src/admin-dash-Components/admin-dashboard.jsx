import { useEffect, useState } from "react";
import ConfigViewer from "./configViewer";
import Overview from "./overview";
import Sidebar from "./sidebar";
import Tenants from "./tenants";
import CreateModal from "./createModal";

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const role =  useState(() => {
    return localStorage.getItem("role");
  });

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const role = params.get("role");
      const userId = params.get("userId");

      if (token) localStorage.setItem("token", token);
      if (role) {
        localStorage.setItem("role", role);
      }
      if (userId) localStorage.setItem("userId", userId);

      //if (!token) window.location.href = "/"; 
    }, []);

    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("token");
        
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
          alert("Error creating tenant");
          return;
        }
        
        alert("Tenant created successfully ✅");
        
        setShowModal(false);
      
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    };

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar role={role} />
      <main className="bg-gray-50 flex-1">
        <Overview setShowModal={setShowModal} />
        {showModal &&
        <CreateModal setShowModal={setShowModal} form={form} setForm={setForm} handleSubmit={handleSubmit} />
        }
        <Tenants />
        <ConfigViewer />
      </main>
    </div>
  )
}