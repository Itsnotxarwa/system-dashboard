import Logo from "../../../assets/image_logo.png";
import Mazia from "../../../assets/mazia.png";
import CampaignTable from "./campaignTable";
import { useState } from "react";
import EditCampaign from "./EditCampaign";
import DeleteCampaign from "./DeleteCampaign";
import apiFetch from "../../shared/ApiFetch";

export default function CampaignOverview({tenant, campaigns, setCampaigns }) {

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
            const response = await apiFetch(
                `https://api.mazia.ai/campaigns/${campaignId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response) return;
            
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
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-6 bg-[#0d1117] flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center justify-start gap-2">
                                <img src={Logo} alt="Mazia" className="w-3.5" />
                                <img src={Mazia} alt="Mazia" className="w-7" />
                            </div>
                            <span className="text-xs text-slate-400 tracking-widest uppercase">
                                {tenant?.name}
                            </span>
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter"
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

                <CampaignTable 
                tenant={tenant} 
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