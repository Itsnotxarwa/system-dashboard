import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import { useState, useEffect } from "react";
import TopBar from "./TopBar";

export default function CallRecords() {
    const {id} = useParams();

    const [tenant, setTenant] = useState(null);

    useEffect(() => {
        const fetchTenant = async () => {
            const token = localStorage.getItem("token");
    
            const res = await fetch(`https://api.voixup.fr/admin/tenants/${id}`,{
                headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                },
            });
            
            const data = await res.json();
            setTenant(data);
        }
        fetchTenant();
    }, [id]);
    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-gray-50 flex-1 flex flex-col p-6 min-h-screen">
                <TopBar tenant={tenant} activeNav={{name: "Call Records"}} />
            </main>
        </div>
    )
}