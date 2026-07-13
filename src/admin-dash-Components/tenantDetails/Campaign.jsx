import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TenantSidebar from "./tenantSidebar";
import TopBar from "./TopBar";
import CampaignOverview from "./campaign-components/camOverview";
import CreateCampaign from "./campaign-components/CreateCampaign";
import apiFetch from "../shared/ApiFetch";

export default function Campaign() {
    const {id} = useParams();
    const [tenant, setTenant] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [agents, setAgents] = useState([]);

     {/* fetch tenants */}
    useEffect(() => {
        const fetchTenant = async () => {
    
            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}`);

            if (!res) return;
            
            const data = await res.json();
            setTenant(data);
        }
        fetchTenant();
    }, [id]);

    {/* fetch Campaigns */}
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
    
            const res = await apiFetch(`https://api.mazia.ai/tenants/${id}/campaigns`);

            if (!res) return;

            if (!res.ok) {
                const data = await res.json();
                alert(data?.detail || "Failed to fetch tenant campaigns");
                setCampaigns([]);
                return;
            }

            const data = await res.json();
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

        const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}/agents`);
            

        if (!res) return;
        
        if (!res.ok) {
            const data = await res.json();
            alert(data?.detail || "Failed to fetch agents");
            setAgents([]);
            return;
        }

            const data = await res.json();
            setAgents(data.agents ?? []);

            } catch (err) {
            console.error(err);
            setAgents([]);
            }
        };

        fetchAgents();
    },[id]);


    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} label="tenants" />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 flex flex-col min-h-screen ml-55">
                <TopBar 
                tenant={tenant} 
                activeNav={{name: "Campaign"}} 
                setShowCreateModal={setShowCreateModal} 
                setShowAgentModal={setShowCreateModal} />
                <CampaignOverview 
                tenant={tenant}
                campaigns={campaigns}
                setCampaigns={setCampaigns}
                updateStatus={updateStatus}
                />
            </main>
            {showCreateModal && 
            <CreateCampaign 
            setCampaigns={setCampaigns}
            agents={agents}
            tenant={tenant}
            onClose={() => setShowCreateModal(false)} 
            onCancel={() => setShowCreateModal(false)} 
            />
            }
        </div>
    )
}