import { Edit, File, FileUp, Pause, Play, RotateCcw, Trash, TriangleAlert } from "lucide-react";
import { useRef, useState } from "react";
import { handleUnauthorized } from "../../../utils/auth";
import DeleteRecipients from "./DeleteRecipients";

export default function CampaignTable({tenant, filteredcampaigns, campaigns, setCampaigns, handleDelete, 
    handleEdit, selectedCampaign, setSelectedCampaign }) {
    const [showDeleteRecs, setShowDeleteRecs] = useState(false);

    const deleteRecipients = async () => {
        try{
            const token = localStorage.getItem("token");
            const campaignId = selectedCampaign.id;
            const response = await fetch(
                `https://api.voixup.fr/campaigns/${campaignId}/recipients`,
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
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(errorData.detail || "Request failed");
            }

            setSelectedCampaign(prev => ({
                ...prev,
                recipients: []
            }));

            console.log("All recipients deleted");
            
            
        } catch (err) {
            console.error(err.message);
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

    const updateCampaignStatus = async (campaignId, status) => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `https://api.voixup.fr/campaigns/${campaignId}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status,
                }),
            }
        );

        if (res.status === 401) {
            handleUnauthorized(401);
            return;
        }

        const data = await res.json();

        if (!res.ok) {
            console.error(data);
            alert(data.detail || "Failed to update status");
            return;
        }

        setCampaigns(prev =>
            prev.map(c =>
                c.id === campaignId
                    ? { ...c, status: data.status || status }
                    : c
            )
        );

    } catch (err) {
        console.error(err);
    }
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
                <div className="py-6 text-center text-sm text-slate-600 rounded-xl
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
                            <td colSpan="10" className="text-center py-6 text-sm text-slate-600">
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
                            <td className="p-[13px_20px] text-[#374151] text-sm">
                                {c.agent_id}
                            </td>
                            <td className="p-[13px_20px] text-center">
                                <div className="flex justify-center items-center">
                                <span className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px] border
                                ${c.status === "READY" ? "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]" : ""}
                                ${c.status === "RUNNING" ? "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]" : ""}
                                ${c.status === "PAUSED" ? "bg-[rgba(245,158,11,.08)] text-[#d97706] border-[rgba(245,158,11,.20)]" : ""}
                                ${c.status === "COMPLETED" ? "bg-[rgba(124,58,237,.08)] text-[#7c3aed] border-[rgba(3,44,166,.20)]" : ""}
                                ${c.status === "DRAFT" ? "bg-[rgba(3,44,166,.08)] text-[#032ca6] border-[rgba(3,44,166,.20)]" : ""}
                                ${c.status === "FAILED" ? "bg-[rgba(220,38,38,.08)] text-[#dc2626] border-[rgba(220,38,38,.20)]" : ""}
                                ${c.status === "CANCELLED" ? "bg-[rgba(244,114,182,.08)] text-[#ec4899] border-[rgba(244,114,182,.20)]" : ""}
                                `}>
                                    <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                    ${c.status === "READY" ? "bg-[#22c55e]" : ""}
                                    ${c.status === "RUNNING" ? "bg-[#22c55e]" : ""}
                                    ${c.status === "PAUSED" ? "bg-[#f59e0b]" : ""}
                                    ${c.status === "COMPLETED" ? "bg-[#a78bfa]" : ""}
                                    ${c.status === "DRAFT" ? "bg-[#6b8fef]" : ""}
                                    ${c.status === "FAILED" ? "bg-[#ef4444]" : ""}
                                    ${c.status === "CANCELLED" ? "bg-[#ec4899]" : ""}
                                    `}></span>
                                    {c?.status || ""}
                                </span>
                                </div>
                            </td>
                            <td className="p-[13px_20px] text-sm text-[#374151]">
                                {c.start_date ? new Date(c.start_date).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }) : ""}
                            </td>
                            <td className="p-[13px_20px] text-sm font-semibold text-[#0a1628]"
                            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                {c.batch_size}
                            </td>
                            <td className="p-[13px_20px] text-sm text-[#7a8bb5] max-w-40">
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
                                            updateCampaignStatus(c.id, "RUNNING")
                                        }}
                                        className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px]
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
                                            updateCampaignStatus(c.id, "PAUSED")
                                        }}
                                        className="bg-[rgba(245,158,11,.08)] border border-[rgba(245,158,11,.25)]
                                        text-[#d97706] flex items-center gap-1 text-sm cursor-pointer
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Pause size={12} />
                                            Pause
                                        </button>
                                    )}

                                    {c.status === "PAUSED" && (
                                        <button 
                                        onClick={() => {
                                            updateCampaignStatus(c.id, "RUNNING")
                                        }}
                                        className="bg-[rgba(5,150,105,.08)] text-[#059669] cursor-pointer
                                        border border-[rgba(5,150,105,.25)] flex items-center gap-1 text-sm
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Play size={12} />
                                            Resume
                                        </button>
                                    )}

                                    {(c.status === "READY" || c.status === "PAUSED" || c.status === "FAILED" || c.status === "RUNNING") && (
                                        <button 
                                        onClick={() => {
                                            updateCampaignStatus(c.id, "CANCELLED")
                                        }}
                                        className="bg-[rgba(5,150,105,.08)] text-[#059669] cursor-pointer
                                        border border-[rgba(5,150,105,.25)] flex items-center gap-1 text-sm
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Play size={12} />
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td>
                                {(!c.recipients || c.recipients.length === 0 || c.status === "DRAFT") ? (
                                    <div className="flex items-center justify-center text-sm gap-1 font-medium
                                    bg-[rgba(245,158,11,.08)] rounded-[20px] p-[3px_10px] text-[#d97706]
                                    border border-[rgba(245,158,11,.22)]">
                                        <TriangleAlert size={12} />
                                        No File
                                    </div>
                                ) : (
                                    <div className="flex items-center text-sm gap-1 font-medium">
                                        <File size={21} stroke="#9aabca" />
                                        <div>
                                            <div className="text-sm font-semibold text-[#059669]">
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
                                    text-sm p-[3px_10px] font-medium
                                    border-[rgba(3,44,166,.20)] flex items-center justify-center gap-1">
                                        <Edit size={12} />
                                        Edit
                                    </button>
                                    <button 
                                    onClick={() => handleDelete(c)}
                                    className="bg-[rgba(220,38,38,.06)] text-[#dc2626] border rounded-[20px]
                                    text-sm p-[3px_10px] font-medium
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
                                        border-[rgba(3,44,166,.20)] flex items-center justify-center text-sm p-[3px_10px] font-medium">
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
                                        border-[rgba(245,158,11,.22)] flex items-center justify-center text-sm
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
                onConfirm={() => {
                    deleteRecipients();
                }}/>
            )}
        </div>
    )
}