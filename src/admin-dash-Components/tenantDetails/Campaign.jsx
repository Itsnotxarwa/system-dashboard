import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TenantSidebar from "./tenantSidebar";
import TopBar from "./TopBar";
import CampaignOverview from "./campaign-components/camOverview";
import CreateCampaign from "./campaign-components/CreateCampaign";

export default function Campaign() {
    const {id} = useParams();
    const [tenant, setTenant] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [agents, setAgents] = useState([]);

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
            try {
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
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            setCampaigns([]);
        }
    }
        fetchCampaigns();
    }, [id]);

    const updateStatus = (id, status) => {
        setCampaigns(prev =>
            prev.map(c =>
                c.id === id ? { ...c, status } : c
            )
        );
    };

    useEffect(() => {
        const fetchAgents = async () => {
            try {
            const token = localStorage.getItem("token");

        const res = await fetch(
            `https://api.voixup.fr/admin/tenants/${id}/agents`,
            {
                headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.status === 404) {
            setAgents([]);
            return;
        }
            const data = await res.json();
            console.log(data)

            setAgents(data);

            } catch (err) {
            console.error(err);
            setAgents([]);
            }
        };

        fetchAgents();
    },[id]);

    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,.03)] flex-1 flex flex-col min-h-screen">
                <TopBar 
                tenant={tenant} 
                activeNav={{name: "Campaign"}} 
                setShowCreateModal={setShowCreateModal} 
                setShowAgentModal={setShowCreateModal} />
                <CampaignOverview 
                tenant={tenant}
                campaigns={campaigns}
                updateStatus={updateStatus}
                />
            </main>
            {showCreateModal && 
            <CreateCampaign 
            agents={agents}
            tenant={tenant}
            onClose={() => setShowCreateModal(false)} 
            onCancel={() => setShowCreateModal(false)} 
            />}
        </div>
    )
}