import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import CallsOverview from "./calls-components/CallsOverview";

export default function CallRecords() {
    const {id} = useParams();

    const [tenant, setTenant] = useState(null);
    const [calls, setCalls] = useState(null);

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

    useEffect(() => {
        const fetchCalls = async () => {
            const token = localStorage.getItem("token");
    
            const res = await fetch(`https://api.voixup.fr/admin/tenants/${id}/calls/overview`,{
                headers: 
                {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data);
            setCalls(data);
            
        }

        fetchCalls();
    },[id]);
    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,.03)] flex-1 flex flex-col p-6 min-h-screen">
                <TopBar tenant={tenant} activeNav={{name: "Call Records"}} />
                <CallsOverview calls={calls} tenant={tenant} />
            </main>
        </div>
    )
}