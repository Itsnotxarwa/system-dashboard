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
    const [file, setFile] = useState(null);

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== "text/csv") {
            alert("Only CSV files allowed");
            return;
        }
        setFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const uploadRecipients = async (campaignId) => {
        if (!file) return;
        try {
            const token = localStorage.getItem("token");
            const tenantId = tenant?.id;

            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch(
                `https://api.voixup.fr/tenants/${tenantId}/campaigns/${campaignId}/recipients/upload`, {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: formData,
                })

                const data = await res.json();
                console.log("UPLOAD RESPONSE:", data);
                setCampaigns((prev) =>
                    prev.map((c) =>
                        c.id === campaignId
                        ? { ...c, total_recipients: data.total_recipients }
                        : c
                    )
                    );
        } catch (error) {
            console.log("error", error)
        } 
    }


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
            handleFileChange={handleFileChange}
            handleDrop={handleDrop}
            uploadRecipients={uploadRecipients}
            handleDragOver={handleDragOver}
            file={file}
            setFile={setFile}
            />}
        </div>
    )
}