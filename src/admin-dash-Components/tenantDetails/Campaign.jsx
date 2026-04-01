import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TenantSidebar from "./tenantSidebar";
import TopBar from "./TopBar";
import CampaignOverview from "./campaign-components/camOverview";

export default function Campaign() {
    const {id} = useParams();
    const [tenant, setTenant] = useState(null);
    const [campaigns, setCampaigns] = useState([]);

     {/* fetch tenants */}
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

    {/* fetch Campaigns */}
    useEffect(() => {
        const fetchCampaigns = async () => {
            const token = localStorage.getItem("token");
    
            const res = await fetch(`https://api.voixup.fr/tenants/${id}/campaigns`,{
                headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log("Campaigns:", data);
            setCampaigns(data);
        }
        fetchCampaigns();
    }, [id]);

    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,.03)] flex-1 flex flex-col min-h-screen">
                <TopBar tenant={tenant} activeNav={{name: "Campaign"}} />
                <CampaignOverview 
                tenant={tenant}
                campaigns={campaigns}
                />
            </main>
        </div>
    )
}