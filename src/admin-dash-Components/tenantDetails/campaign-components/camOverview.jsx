import Logo from "../../../assets/image.png";
import CampaignTable from "./campaignTable";
import { useState } from "react";
import EditCampaign from "./EditCampaign";
import DeleteCampaign from "./DeleteCampaign";
import { handleUnauthorized } from "../../../utils/auth";

export default function CampaignOverview({tenant, campaigns, file, setCampaigns }) {

    const [filter, setFilter] = useState("ALL");
    const filteredCampaigns = filter === "ALL" ? campaigns : campaigns.filter(c => c.status === filter);

    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEdit = (campaign) => {
        setSelectedCampaign(campaign);
        setShowEditModal(true);
    };
    const handleDelete = (campaign) => {
        setSelectedCampaign(campaign);
        setShowDeleteModal(true);
    };

    const deleteCampaign = async (campaignId) => {
        try{
            console.log(tenant.id, campaignId)
            const token = localStorage.getItem("token");
            const response = await fetch(
                `https://api.voixup.fr/tenants/${tenant.id}/campaigns/${campaignId}/force`,
                {
                    method: "DELETE",
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
            }
            );
            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }
            if (!response.ok) {
                const errorText = await response.text(); 
                console.error("Delete failed - status:", response.status, "body:", errorText);
                throw new Error(errorText || "Delete failed");
            }

            setCampaigns(prev => prev.filter(t => t.id !== campaignId));

            const data = await response.json();
            console.log(data);
            
        } catch (err) {
            console.log(`Failed: ${err?.detail}`)
        }
    }

    return(
        <div className="min-h-screen bg-linear-to-br from-white to-[rgba(3,44,166,0.09)]">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <img src={Logo} alt="Logo" className="w-14" />
                            <span className="text-xs text-slate-400 tracking-widest uppercase">
                                {tenant?.name}
                            </span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tighter"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Campaigns Overview
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {tenant?.id}
                        </p>
                    </div>
                </div>

                {campaigns.length === 0 ? null : (
                <div className="flex items-center gap-3 my-4">
                    <div className="flex gap-1 p-1 rounded-xl bg-[rgba(3,44,166,.05)] border
                    border-[rgba(3,44,166,.10)]">
                        {["ALL", "READY", "PAUSED", "COMPLETED", "DRAFT"].map((status) => {
                            const isActive = filter === status;
                            return (
                                <button
                                    key={status}
                                    className={`px-3 py-1.5 text-xs transition-all rounded-xl
                                        ${isActive ? "bg-[#032ca6] text-white font-medium" 
                                            : "text-slate-500 hover:bg-white"
                                        }
                                    `}
                                    onClick={() => setFilter(status)}
                                >
                                    {status}
                                </button>
                            );
                        })}
                    </div>
                </div>
                )}

                {campaigns.length === 0 ? null :(
                <p className="text-[16px] text-slate-500 my-4"
                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                    Manage outbound call campaigns
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[rgba(3,44,166,.08)] text-[#032ca6]">
                        {campaigns?.length} campaigns
                    </span>
                </p>
                )}

                <CampaignTable 
                tenant={tenant} 
                file={file} 
                filteredcampaigns={filteredCampaigns} 
                campaigns={campaigns}
                setCampaigns={setCampaigns}
                selectedCampaign={selectedCampaign}
                setSelectedCampaign={setSelectedCampaign}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                />

                {showEditModal && (
                    <EditCampaign
                    onCancel={() => setShowEditModal(false)}
                    onClose={() => setShowEditModal(false)} />
                )}
                {showDeleteModal && selectedCampaign && (
                    <DeleteCampaign 
                    selectedCampaign={selectedCampaign} 
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={() => {
                    deleteCampaign(selectedCampaign.id);
                    setShowDeleteModal(false);
                    }} 
                    />
                )}
            </div>
        </div>
    )
}