import { Edit, File, FileUp, Pause, Play, Trash, TriangleAlert, X } from "lucide-react";
import { useRef, useState } from "react";
import { handleUnauthorized } from "../../../utils/auth";
import DeleteRecipients from "./DeleteRecipients";

export default function CampaignTable({ filteredcampaigns, campaigns, setCampaigns, handleDelete,
    handleEdit, selectedCampaign, setSelectedCampaign }) {
    const [showDeleteRecs, setShowDeleteRecs] = useState(false);

    const deleteRecipients = async () => {
        try {
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
                throw new Error(errorData.detail || "Request failed");
            }

            setCampaigns(prev =>
                prev.map(c =>
                    c.id === campaignId ? { ...c, recipients: [] } : c
                )
            );
            setSelectedCampaign(prev => ({ ...prev, recipients: [] }));
            setShowDeleteRecs(false);

        } catch (err) {
            console.error(err.message);
            alert(`Failed to delete recipients: ${err.message}`);
        }
    };

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
                `https://api.voixup.fr/campaigns/${uploadingCampaignId}/recipients`,
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

            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();

            setCampaigns(prev =>
                prev.map(c =>
                    c.id === uploadingCampaignId
                        ? { ...c, recipients: data.recipients ?? c.recipients, status: data.status ?? c.status }
                        : c
                )
            );

            alert(`Uploaded successfully — ${data.valid_recipients} valid, ${data.invalid_recipients} invalid out of ${data.total_recipients} total`);
            window.location.reload();

        } catch (err) {
            alert(`Failed to upload recipients: ${err.message}`);
        } finally {
            e.target.value = "";
            setUploadingCampaignId(null);
        }
    };

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
                    body: JSON.stringify({ status }),
                }
            );

            if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }

            const data = await res.json();

            if (!res.ok) {
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

    const STATUS_STYLES = {
        READY:     { badge: "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]",   dot: "bg-[#22c55e]" },
        RUNNING:   { badge: "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]",   dot: "bg-[#22c55e]" },
        PAUSED:    { badge: "bg-[rgba(245,158,11,.08)] text-[#d97706] border-[rgba(245,158,11,.20)]", dot: "bg-[#f59e0b]" },
        COMPLETED: { badge: "bg-[rgba(124,58,237,.08)] text-[#7c3aed] border-[rgba(3,44,166,.20)]",   dot: "bg-[#a78bfa]" },
        DRAFT:     { badge: "bg-[rgba(3,44,166,.08)] text-[#032ca6] border-[rgba(3,44,166,.20)]",     dot: "bg-[#6b8fef]" },
        FAILED:    { badge: "bg-[rgba(220,38,38,.08)] text-[#dc2626] border-[rgba(220,38,38,.20)]",   dot: "bg-[#ef4444]" },
        CANCELLED: { badge: "bg-[rgba(244,114,182,.08)] text-[#ec4899] border-[rgba(244,114,182,.20)]", dot: "bg-[#ec4899]" },
    };

    return (
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
                    No campaigns yet — click{" "}
                    <strong className="text-blue-700">+ Add Campaign</strong>
                    {" "}to create one.
                </div>
            ) : filteredcampaigns.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-400">
                    No campaigns match your search.
                </div>
            ) : (
                <table className="w-full border-collapse">
                    <thead className="bg-[rgba(3,44,166,.025)] border-b border-[rgba(3,44,166,.07)]">
                        <tr>
                            {["Campaign Name", "Agent", "Status", "Start Date", "Batch", "Time Slots", "Actions", "Recipients", ""].map((h, i) => (
                                <th key={i} className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredcampaigns.map((c) => {
                            const style = STATUS_STYLES[c.status] ?? {};
                            const hasRecipients = c.recipients && c.recipients.length > 0;

                            return (
                                <tr key={c.id} className="border-t border-[rgba(3,44,166,.04)] hover:bg-[rgba(3,44,166,.015)] transition-colors">
                                    <td className="p-[13px_20px]">
                                        <div className="text-sm font-semibold text-slate-800">{c.name || ""}</div>
                                        <div className="text-[9px] text-[#9aabca] mt-0.5">{c.id}</div>
                                    </td>
                                    <td className="p-[13px_20px] text-[#374151] text-sm">{c.agent_id}</td>
                                    <td className="p-[13px_20px]">
                                        <div className="flex justify-center items-center">
                                            <span className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px] border ${style.badge}`}>
                                                <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${style.dot}`} />
                                                {c.status || ""}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-[13px_20px] text-sm text-[#374151]">
                                        {c.start_date ? new Date(c.start_date).toLocaleDateString("fr-FR", {
                                            year: "numeric", month: "short", day: "numeric",
                                        }) : ""}
                                    </td>
                                    <td className="p-[13px_20px] text-sm font-semibold text-[#0a1628]"
                                        style={{ fontFamily: "'Cabinet Grotesk',sans-serif" }}>
                                        {c.batch_size}
                                    </td>
                                    <td className="p-[13px_20px] text-sm text-[#7a8bb5] max-w-40">
                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                            {c.time_slots?.map((slot, i) => (
                                                <div key={i}>{slot.start_time} - {slot.end_time}</div>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-[13px_20px]">
                                        <div className="flex gap-1 flex-wrap">
                                            {(c.status === "READY" || c.status === "PAUSED" || c.status === "DRAFT") && (
                                                <button
                                                    disabled={!hasRecipients}
                                                    onClick={() => updateCampaignStatus(c.id, "RUNNING")}
                                                    className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px]
                                                    bg-[rgba(5,150,105,.08)] text-[#059669] border border-[rgba(5,150,105,.25)]
                                                    ${!hasRecipients ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                                                    <Play size={12} />
                                                    Start
                                                </button>
                                            )}

                                            {c.status === "RUNNING" && (
                                                <button
                                                    onClick={() => updateCampaignStatus(c.id, "PAUSED")}
                                                    className="cursor-pointer bg-[rgba(245,158,11,.08)] border border-[rgba(245,158,11,.25)]
                                                    text-[#d97706] flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px]">
                                                    <Pause size={12} />
                                                    Pause
                                                </button>
                                            )}

                                            {c.status === "PAUSED" && (
                                                <button
                                                    onClick={() => updateCampaignStatus(c.id, "RUNNING")}
                                                    className="cursor-pointer bg-[rgba(5,150,105,.08)] text-[#059669]
                                                    border border-[rgba(5,150,105,.25)] flex items-center gap-1 text-sm
                                                    font-medium py-1 px-2.5 rounded-[20px]">
                                                    <Play size={12} />
                                                    Resume
                                                </button>
                                            )}

                                            {(c.status === "READY" || c.status === "PAUSED" || c.status === "FAILED" || c.status === "RUNNING") && (
                                                <button
                                                    onClick={() => updateCampaignStatus(c.id, "CANCELLED")}
                                                    className="cursor-pointer bg-[rgba(220,38,38,.06)] text-[#dc2626]
                                                    border border-[rgba(220,38,38,.20)] flex items-center gap-1 text-sm
                                                    font-medium py-1 px-2.5 rounded-[20px]">
                                                    <X size={12} />
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                    {/* Recipients indicator */}
                                    <td className="p-[13px_20px]">
                                        {!hasRecipients || c.status === "DRAFT" ? (
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
                                                        {c.recipients.length}
                                                    </div>
                                                    <div className="text-[10px] text-[#9aabca]">File Uploaded</div>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    {/* Row actions */}
                                    <td className="p-[13px_20px]">
                                        <div className="flex gap-1 flex-wrap">
                                            <button
                                                onClick={() => handleEdit(c)}
                                                className="cursor-pointer bg-[rgba(3,44,166,.07)] text-[#032ca6] border rounded-[20px]
                                                text-sm p-[3px_10px] font-medium border-[rgba(3,44,166,.20)] flex items-center gap-1">
                                                <Edit size={12} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(c)}
                                                className="cursor-pointer bg-[rgba(220,38,38,.06)] text-[#dc2626] border rounded-[20px]
                                                text-sm p-[3px_10px] font-medium border-[rgba(220,38,38,.16)] flex items-center gap-1">
                                                <Trash size={12} />
                                                Delete
                                            </button>
                                            {!hasRecipients || c.status === "DRAFT" ? (
                                                <button
                                                    onClick={() => handleUploadFile(c.id)}
                                                    className="cursor-pointer bg-[rgba(3,44,166,.07)] text-[#032ca6] border rounded-[20px] gap-1
                                                    border-[rgba(3,44,166,.20)] flex items-center text-sm p-[3px_10px] font-medium">
                                                    <FileUp size={12} />
                                                    Upload
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setSelectedCampaign(c);
                                                        setShowDeleteRecs(true);
                                                    }}
                                                    className="cursor-pointer bg-[rgba(245,158,11,.06)] text-[#d97706] border rounded-[20px] gap-1
                                                    border-[rgba(245,158,11,.22)] flex items-center text-sm p-[3px_10px] font-medium">
                                                    <Trash size={12} />
                                                    Recipients
                                                    <span className="text-[9px] p-[1px_5px] rounded-sm bg-[rgba(245,158,11,.12)]">
                                                        {c.recipients.length}
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {showDeleteRecs && (
                <DeleteRecipients
                    selectedCampaign={selectedCampaign}
                    onCancel={() => setShowDeleteRecs(false)}
                    onConfirm={deleteRecipients}
                />
            )}
        </div>
    );
}