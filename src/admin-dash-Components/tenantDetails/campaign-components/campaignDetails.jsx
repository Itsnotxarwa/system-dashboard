import { X, Edit, Trash } from "lucide-react";
import { useState } from "react";
import EditCampaign from "./EditCampaign";
import DeleteCampaign from "./DeleteCampaign";

export default function CampaignDetails({selectedCampaign, onClose, setSelectedCampaign, tenant, setCampaigns}) {
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
            if (!response.ok) throw new Error("Delete failed");

            const data = await response.json();
            console.log(data);
            setCampaigns(prev => prev.filter(t => t.id !== campaignId));
            console.log(tenant.id, campaignId)

        } catch (err) {
            console.log(`Failed: ${err?.detail}`)
        }
    }
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl  
            shadow-[0_24px_80px_rgba(3,44,166,0.18)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh]
            flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b shrink-0 border border-[rgba(3,44,166,0.08)]
                bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
                    <div className="w-9 h-9 rounded-xs bg-linear-to-br from-[#032ca6] to-[#1a6bff]
                    flex items-center justify-center text-white text-[11px] font-extrabold shrink-0">
                        {selectedCampaign?.name ? selectedCampaign.name
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0,2)
                        .join("") 
                        : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-base tracking-tight" 
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif;"}}>
                            {selectedCampaign?.name || ""}
                        </div>
                        <div className="text-xs text-[#9aabca] mt-0.5">
                            {selectedCampaign?.id || ""}
                        </div>
                    </div>
                    <button 
                    className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                    bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                    justify-center" 
                    onClick={onClose}
                    >
                        <X />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5 py-4 px-5.5">
                    <div className="py-2.5 px-3 rounded-[10px] bg-[rgba(3,44,166,.03)] border
                    border-[rgba(3,44,166,.08)]">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1">
                            Status
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px]
                        ${selectedCampaign.status === "READY" ? " text-[#059669]" : ""}
                        ${selectedCampaign.status === "RUNNING" ? " text-[#059669]" : ""}
                        ${selectedCampaign.status === "PAUSED" ? " text-[#d97706]" : ""}
                        ${selectedCampaign.status === "COMPLETED" ? " text-[#7c3aed]" : ""}
                        ${selectedCampaign.status === "DRAFT" ? " text-[#032ca6]" : ""}
                        `}>
                            <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                            ${selectedCampaign.status === "READY" ? "bg-[#22c55e]" : ""}
                            ${selectedCampaign.status === "RUNNING" ? "bg-[#22c55e]" : ""}
                            ${selectedCampaign.status === "PAUSED" ? "bg-[#f59e0b]" : ""}
                            ${selectedCampaign.status === "COMPLETED" ? "bg-[#a78bfa]" : ""}
                            ${selectedCampaign.status === "DRAFT" ? "bg-[#6b8fef]" : ""}
                            `}></span>
                            {selectedCampaign?.status || ""}
                        </span>
                    </div>
                    <div className="py-2.5 px-3 rounded-[10px] bg-[rgba(3,44,166,.03)] border
                    border-[rgba(3,44,166,.08)]">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1">
                            Agent
                        </div>
                        <div className="text-xs font-semibold text-[#374151]">
                            {selectedCampaign?.agent_id || ""}
                        </div>
                    </div>
                    <div className="py-2.5 px-3 rounded-[10px] bg-[rgba(3,44,166,.03)] border
                    border-[rgba(3,44,166,.08)]">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1">
                            Start Date
                        </div>
                        <div className="text-xs font-semibold text-[#374151]">
                            {selectedCampaign?.start_date || ""}
                        </div>
                    </div>
                    <div className="py-2.5 px-3 rounded-[10px] bg-[rgba(3,44,166,.03)] border
                    border-[rgba(3,44,166,.08)]">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1">
                            Batch Size
                        </div>
                        <div className="text-xs font-semibold text-[#374151] grid-cols">
                            {selectedCampaign?.batch_size || ""}
                        </div>
                    </div>
                    <div className="py-2.5 px-3 rounded-[10px] bg-[rgba(3,44,166,.03)] border
                    border-[rgba(3,44,166,.08)] col-span-full">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1">
                            Time Slots
                        </div>
                        <div className="text-xs font-semibold text-[#374151] grid-cols">
                            {selectedCampaign?.time_slots.map((t) => (
                                <span className="text-xs p-[3px_9px] font-medium rounded-md
                                bg-[rgba(3,44,166,.07)] border border-[rgba(3,44,166,.15)] 
                                text-[#032ca6]"
                                style={{fontFamily: "'DM Mono',monospace"}}>
                                    {t.start_time} → {t.end_time}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 p-[0_22px_20px]">
                    <button
                    onClick={() => handleEdit(selectedCampaign)}
                    className="flex-1 cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-[#032ca6]
                    transition-all flex items-center gap-1.5 bg-[rgba(3,44,166,.05)] border 
                    border-[rgba(3,44,166,.15)]">
                        <Edit />
                        Edit
                    </button>
                    <button
                    onClick={() => handleDelete(selectedCampaign)}
                    className="flex-1 cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold transition-all 
                    flex items-center gap-1.5 border border-[rgba(220,38,38,.20)] bg-[rgba(220,38,38,.05)]
                    text-[#dc2626]">
                        <Trash />
                        Delete
                    </button>
                </div>
            </div>
            {showEditModal && (
                <EditCampaign
                onCancel={() => setShowEditModal(false)}
                onClose={() => setShowEditModal(false)} />
            )}
            {showDeleteModal && (
                <DeleteCampaign 
                selectedCampaign={selectedCampaign} 
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={(id) => {
                deleteCampaign(id);
                setShowDeleteModal(false);
                }} 
                />
            )}
        </div>
    )
}