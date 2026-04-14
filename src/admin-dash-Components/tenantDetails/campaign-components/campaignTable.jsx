import { Edit, File, FileUp, Pause, Play, RotateCcw, Trash, TriangleAlert } from "lucide-react";
import { useRef, useState } from "react";
import { handleUnauthorized } from "../../../utils/auth";
import DeleteRecipients from "./DeleteRecipients";

export default function CampaignTable({tenant, filteredcampaigns, updateStatus, campaigns, setCampaigns, handleDelete, 
    handleEdit, selectedCampaign, setSelectedCampaign }) {
    const [showDeleteRecs, setShowDeleteRecs] = useState(false);

    const deleteRecipient = async (recipientId) => {
        try{
            const token = localStorage.getItem("token");
            const campaignId = selectedCampaign.id;
            const response = await fetch(
                `https://api.voixup.fr/tenants/${tenant.id}/campaigns/${campaignId}/recipients/${recipientId}`,
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

            setSelectedCampaign(prev => ({
                ...prev,
                recipients: prev.recipients.filter(r => r.id !== recipientId)
            }));
            const data = await response.json();
            console.log(data);
            
            
        } catch (err) {
            console.log(`Failed: ${err?.detail}`)
        }
    }

    const uploadInputRef = useRef(null);
    const [uploadingCampaignId, setUploadingCampaignId] = useState(null);
    const handleUploadFile = (campaignId) => {
        setUploadingCampaignId(campaignId);
        uploadInputRef.current.click();
    };
    const handleUploadChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("file", selectedFile);

            const res = await fetch(
                `https://api.voixup.fr/tenants/${tenant?.id}/campaigns/${uploadingCampaignId}/recipients/upload`,
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (!res.ok) throw new Error();
            const data = await res.json();
            alert(`Uploaded successfully — ${data.valid_recipients} valid, ${data.invalid_recipients} invalid out of ${data.total_recipients} total`);

        } catch {
            alert("Failed to upload recipients");
        } finally {
            e.target.value = ""; 
            setUploadingCampaignId(null);
        }
    }
    {/* START */}
    const startCampaign = async (campaignId, recipients) => {
        if (!recipients || recipients.length === 0) {
            alert("No recipients");
            return;
        }
    try {
        const token = localStorage.getItem("token");
        const tenantId = tenant?.id;
        const res = await fetch(
            `https://api.voixup.fr/tenants/${tenantId}/campaigns/${campaignId}/start`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.status === 401) {
            handleUnauthorized(401);
            return;
        }
        
        if (!res.ok) {
            const err = await res.json();
            console.error(err);
            return;
        }

        const data = await res.json();
        setCampaigns(prev => prev.map(c => c.id === campaignId ? {...c, status: data.status} : c ))
        updateStatus(campaignId, data.status);

    } catch (err) {
        console.error(err);
    }
    };
    {/* PAUSE */}
    const pauseCampaign = async (campaignId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `https://api.voixup.fr/tenants/${tenant?.id}/campaigns/${campaignId}/pause`,
            { method: "POST", headers: { accept: "application/json", Authorization: `Bearer ${token}` } }
        );
        if (res.status === 401) {
            handleUnauthorized(401);
            return;
        }
        if (!res.ok) throw new Error();

        const data = await res.json();
        setCampaigns(prev => prev.map(c => c.id === campaignId ? {...c, status: data.status} : c ))
        updateStatus(campaignId, data.status);

    } catch (err) { console.error(err); }
    };

    {/* RESUME */}
    const resumeCampaign = async (campaignId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `https://api.voixup.fr/tenants/${tenant?.id}/campaigns/${campaignId}/resume`,
            { method: "POST", headers: { accept: "application/json", Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error();

        const data = await res.json();
        setCampaigns(prev => prev.map(c => c.id === campaignId ? {...c, status: data.status} : c ))
        updateStatus(campaignId, data.status);

    } catch (err) { 
        console.error(err);
    }
    };

    {/* RESET */}
    const resetCampaign = async (campaignId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `https://api.voixup.fr/tenants/${tenant?.id}/campaigns/${campaignId}/reset`,
            { method: "POST", headers: { accept: "application/json", Authorization: `Bearer ${token}` } }
        );
        if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }
        if (!res.ok) throw new Error();

        const data = await res.json();
        setCampaigns(prev => prev.map(c => c.id === campaignId ? {...c, status: data.status} : c ))
        updateStatus(campaignId, data.status);
        
    } catch (err) { console.error(err); }
    };

    return(
        <div className="bg-white rounded-2xl overflow-hidden mb-6 border border-[rgba(3,44,166,.09)] 
        shadow-[0_2px_12px_rgba(3,44,166,.06)]">
            <input
                ref={uploadInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleUploadChange}
            />
            {campaigns.length === 0 ? (
                <div className="py-6 text-center text-[11px] text-slate-300 rounded-xl
                border-dashed border-[rgba(3,44,166,0.12)]">
                    No campaigns yet — click {" "}
                    <strong className="text-blue-700">+ Add Campaign</strong> 
                    {" "}to create one.
                </div>
            ) : (
            <table className="w-full border-collapse">
                <thead className="bg-[rgba(3,44,166,.025)] border-b border-[rgba(3,44,166,.07)]">
                    <tr>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Campaign Name
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Agent
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Status
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Start Date
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Batch
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Time Slots
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Actions
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Recipients
                        </th>
                        <th className="px-5 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="text-center py-6 text-sm text-slate-500">
                                No campaigns for this tenant
                            </td>
                        </tr>
                        ) : (
                        filteredcampaigns.map((c) => (
                        <tr
                        key={c.id}
                        >
                            <td className="p-[13px_20px]">
                                <div className="text-sm font-semibold text-slate-800">
                                    {c?.name || ""}
                                </div>
                                <div className="text-[9px] text-[#9aabca] mt-0.5">
                                    {c.id}
                                </div>
                            </td>
                            <td className="p-[13px_20px] text-[#374151] text-xs">
                                {c.agent_id}
                            </td>
                            <td className="p-[13px_20px]">
                                <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                                ${c.status === "READY" ? "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]" : ""}
                                ${c.status === "RUNNING" ? "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]" : ""}
                                ${c.status === "PAUSED" ? "bg-[rgba(245,158,11,.08)] text-[#d97706] border-[rgba(245,158,11,.20)]" : ""}
                                ${c.status === "COMPLETED" ? "bg-[rgba(124,58,237,.08)] text-[#7c3aed] border-[rgba(3,44,166,.20)]" : ""}
                                ${c.status === "DRAFT" ? "bg-[rgba(3,44,166,.08)] text-[#032ca6] border-[rgba(3,44,166,.20)]" : ""}
                                `}>
                                    <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                    ${c.status === "READY" ? "bg-[#22c55e]" : ""}
                                    ${c.status === "RUNNING" ? "bg-[#22c55e]" : ""}
                                    ${c.status === "PAUSED" ? "bg-[#f59e0b]" : ""}
                                    ${c.status === "COMPLETED" ? "bg-[#a78bfa]" : ""}
                                    ${c.status === "DRAFT" ? "bg-[#6b8fef]" : ""}
                                    `}></span>
                                    {c?.status || ""}
                                </span>
                            </td>
                            <td className="p-[13px_20px] text-xs text-[#374151]">
                                {c.start_date ? new Date(c.start_date).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }) : ""}
                            </td>
                            <td className="p-[13px_20px] text-xs font-semibold text-[#0a1628]"
                            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                {c.batch_size}
                            </td>
                            <td className="p-[13px_20px] text-xs text-[#7a8bb5] max-w-40">
                                <div className="flex-nowrap overflow-hidden text-ellipsis">
                                    {c.time_slots?.map((slot, index) => (
                                        <div key={index}>
                                            {slot.start_time} - {slot.end_time}
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <div className="flex gap-1 flex-wrap">
                                    {(c.status === "READY" || c.status === "PAUSED" || c.status === "DRAFT") && (
                                        <button 
                                        disabled={!c.recipients || c.recipients.length === 0}
                                        onClick={() => {
                                            startCampaign(c.id)
                                        }}
                                        className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px]
                                        ${(c.status === "READY" || c.status === "PAUSED" || c.status === "DRAFT")
                                            ? "bg-[rgba(5,150,105,.08)] text-[#059669] border border-[rgba(5,150,105,.25)]"
                                            : "bg-gray-100 text-gray-400 border"
                                        }
                                        ${(!c.recipients || c.recipients.length === 0) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                        `}>
                                            <Play size={12} />
                                            Start
                                        </button>
                                    )}

                                    {c.status === "RUNNING" && (
                                        <button 
                                        onClick={() => {
                                            pauseCampaign(c.id)
                                        }}
                                        className="bg-[rgba(245,158,11,.08)] border border-[rgba(245,158,11,.25)]
                                        text-[#d97706] flex items-center gap-1 text-xs cursor-pointer
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Pause size={12} />
                                            Pause
                                        </button>
                                    )}

                                    {c.status === "PAUSED" && (
                                        <button 
                                        onClick={() => {
                                            resumeCampaign(c.id)
                                        }}
                                        className="bg-[rgba(5,150,105,.08)] text-[#059669] cursor-pointer
                                        border border-[rgba(5,150,105,.25)] flex items-center gap-1 text-xs
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Play size={12} />
                                            Resume
                                        </button>
                                    )}

                                    {(c.status === "RUNNING" || c.status === "PAUSED" || c.status === "COMPLETED") && (
                                        <button 
                                        onClick={() => {
                                            resetCampaign(c.id)
                                        }}
                                        className="bg-[rgba(3,44,166,.07)] text-[#032ca6] cursor-pointer
                                        border border-[rgba(3,44,166,.18)] flex items-center gap-1 text-xs
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <RotateCcw size={12} />
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td>
                                {(!c.recipients || c.recipients.length === 0 || c.status === "DRAFT") ? (
                                    <div className="flex items-center justify-center text-xs gap-1 font-medium
                                    bg-[rgba(245,158,11,.08)] rounded-[20px] p-[3px_10px] text-[#d97706]
                                    border border-[rgba(245,158,11,.22)]">
                                        <TriangleAlert size={12} />
                                        No File
                                    </div>
                                ) : (
                                    <div className="flex items-center text-xs gap-1 font-medium">
                                        <File size={21} stroke="#032ca6" />
                                        <div>
                                            <div className="text-xs font-semibold text-[#059669]">
                                                {c.recipients?.length || 0}
                                            </div>
                                            <div className="text-[10px] text-[#9aabca]">
                                                File Uploaded
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td className="p-[13px_20px]">
                                <div className="flex gap-1 flex-wrap">
                                    <button 
                                    onClick={() => handleEdit(c)}
                                    className="bg-[rgba(3,44,166,.07)] text-[#032ca6] border rounded-[20px]
                                    text-xs p-[3px_10px] font-medium
                                    border-[rgba(3,44,166,.20)] flex items-center justify-center gap-1">
                                        <Edit size={12} />
                                        Edit
                                    </button>
                                    <button 
                                    onClick={() => handleDelete(c)}
                                    className="bg-[rgba(220,38,38,.06)] text-[#dc2626] border rounded-[20px]
                                    text-xs p-[3px_10px] font-medium
                                    border-[rgba(220,38,38,.16)] flex items-center justify-center gap-1">
                                        <Trash size={12} />
                                        Delete
                                    </button>
                                    {(!c.recipients || c.recipients.length === 0 || c.status === "DRAFT") ? (
                                        <button 
                                        onClick={() => {
                                            handleUploadFile(c.id)
                                        }}
                                        className="bg-[rgba(3,44,166,.07)] text-[#032ca6] border rounded-[20px] gap-1 
                                        border-[rgba(3,44,166,.20)] flex items-center justify-center text-xs p-[3px_10px] font-medium">
                                            <FileUp size={12} />
                                            Upload
                                        </button>
                                    ) : (
                                        <button 
                                        onClick={() => {
                                            setSelectedCampaign(c);
                                            setShowDeleteRecs(true);
                                        }}
                                        className="bg-[rgba(245,158,11,.06)] text-[#d97706] border rounded-[20px] gap-1 
                                        border-[rgba(245,158,11,.22)] flex items-center justify-center text-xs
                                        p-[3px_10px] font-medium">
                                            <Trash size={12} />
                                            Recipients
                                            <span className="text-[9px] p-[1px_5px] rounded-sm
                                            bg-[rgba(245,158,11,.12)]">
                                                {c.recipients.length}
                                            </span>
                                        </button>
                                    )
                                    }
                                </div>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            )}
            {showDeleteRecs && (
                <DeleteRecipients
                selectedCampaign={selectedCampaign}
                onCancel={() => setShowDeleteRecs(false)}
                onConfirm={(recipientId) => {
                    deleteRecipient(recipientId);
                }}/>
            )}
        </div>
    )
}