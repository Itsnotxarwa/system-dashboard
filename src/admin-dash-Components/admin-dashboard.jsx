import { useEffect, useState } from "react";
import Overview from "./tenants-components/overview";
import Sidebar from "./sidebar";
import Tenants from "./tenants";
import CreateModal from "./tenants-components/createModal";
import apiFetch from "./shared/ApiFetch";

export default function AdminDashboard() {

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);

  {/* GET TENANTS */}
    useEffect(() => {
        const fetchTenants = async () => {
            try {
                setLoading(true);

                const response = await apiFetch("https://api.mazia.ai/admin/tenants");
                if (!response.ok) throw new Error("Failed to fetch tenants");
                
                const data = await response.json();
                console.log("tenants:", data);
                
                setTenants(data); 
            } catch (error) {
                console.error(error);
                setTenants([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTenants();
    }, []);
    
  const [createdTenant, setCreatedTenant] = useState(null);

  const handleSubmit = async () => {

    // validation
    const newErrors = {
      name: !form.name.trim() ? "Name is required" : "",
      email: !form.email.trim()
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? "Enter a valid email"
        : "",
      phone: !form.phone.trim()
        ? "Phone is required"
        : !/^\+?[0-9\s\-()]{7,15}$/.test(form.phone.trim())
        ? "Enter a valid phone number"
        : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(e => e !== "")) return;

    try {
      const response = await apiFetch("https://api.mazia.ai/admin/tenants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data?.detail || "Failed to create tenant"}`);
        return;
      }

      setTenants(prev => [...prev, data]);
      setCreatedTenant(data);

    } catch (error) {
      console.error(error);
      alert(`Failed: ${error?.message}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">
      <Sidebar />
      <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-55">
        <div className="max-w-7xl mx-auto p-6">
            <Overview setShowModal={setShowModal} tenants={tenants} loading={loading} />
            <Tenants loading={loading} tenants={tenants} setTenants={setTenants} />
        </div>
      </main>
      {showModal &&
        <CreateModal 
        errors={errors}
        setShowModal={setShowModal} 
        form={form} 
        setForm={setForm} 
        createdTenant={createdTenant}
        setCreatedTenant={setCreatedTenant}
        handleSubmit={handleSubmit} />
      }
    </div>
  )
}