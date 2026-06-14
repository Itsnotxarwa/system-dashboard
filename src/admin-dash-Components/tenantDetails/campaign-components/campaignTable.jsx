import { Edit, File, FileUp, Pause, Play, Trash, TriangleAlert, X } from "lucide-react";
import { useRef, useState } from "react";
import DeleteRecipients from "./DeleteRecipients";
import apiFetch from "../../shared/ApiFetch";

export default function CampaignTable({ filteredcampaigns, campaigns, setCampaigns, handleDelete,
    handleEdit, selectedCampaign, setSelectedCampaign }) {
    const [showDeleteRecs, setShowDeleteRecs] = useState(false);

    const deleteRecipients = async () => {
        try {
            const campaignId = selectedCampaign.id;
            const response = await apiFetch(
                `https://api.mazia.ai/campaigns/${campaignId}/recipients`,
                {
                    method: "DELETE",
                }
            );
            if (!response) return;

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Request failed");
            }
            setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, recipients: [] } : c));
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
            const formData = new FormData();
            formData.append("file", selectedFile);
            const res = await fetch(
                `https://api.mazia.ai/campaigns/${uploadingCampaignId}/recipients`,
                {
                    method: "POST",
                    credentials: "include", 
                    body: formData,
                }
            );
            if (!res) return;

            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            setCampaigns(prev => prev.map(c =>
                c.id === uploadingCampaignId
                    ? { ...c, recipients: data.recipients ?? c.recipients, status: data.status ?? c.status }
                    : c
            ));
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
            const res = await apiFetch(`https://api.mazia.ai/campaigns/${campaignId}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            });
            if (!res) return;
            const data = await res.json();
            if (!res.ok) { alert(data.detail || "Failed to update status"); return; }
            setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status: data.status || status } : c));
        } catch (err) {
            console.error(err);
        }
    };

    const STATUS_STYLES = {
        READY:     { badge: "bg-[rgba(63,185,80,.1)] text-[#3fb950] border-[rgba(63,185,80,.25)]",     dot: "bg-[#3fb950] shadow-[0_0_5px_#3fb950]" },
        RUNNING:   { badge: "bg-[rgba(63,185,80,.1)] text-[#3fb950] border-[rgba(63,185,80,.25)]",     dot: "bg-[#3fb950] shadow-[0_0_5px_#3fb950]" },
        PAUSED:    { badge: "bg-[rgba(210,153,34,.1)] text-[#d29922] border-[rgba(210,153,34,.25)]",   dot: "bg-[#d29922] shadow-[0_0_5px_#d29922]" },
        COMPLETED: { badge: "bg-[rgba(188,140,255,.1)] text-[#bc8cff] border-[rgba(188,140,255,.25)]", dot: "bg-[#bc8cff] shadow-[0_0_5px_#bc8cff]" },
        DRAFT:     { badge: "bg-[rgba(88,166,255,.1)] text-[#58a6ff] border-[rgba(88,166,255,.25)]",   dot: "bg-[#58a6ff]" },
        FAILED:    { badge: "bg-[rgba(248,81,73,.1)] text-[#f85149] border-[rgba(248,81,73,.25)]",     dot: "bg-[#f85149] shadow-[0_0_5px_#f85149]" },
        CANCELLED: { badge: "bg-[rgba(139,148,158,.1)] text-[#8b949e] border-[rgba(139,148,158,.25)]", dot: "bg-[#8b949e]" },
    };

    return (
        <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
            <input
                ref={uploadInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleUploadChange}
            />

            {campaigns.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#8b949e] font-mono border-dashed border border-[#21262d] rounded-xl m-4">
                    No campaigns yet —{" "}
                    <strong className="text-[#58a6ff]">+ Add Campaign</strong>
                    {" "}to create one.
                </div>
            ) : filteredcampaigns.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#8b949e] font-mono">
                    No campaigns match your search.
                </div>
            ) : (
                <table className="w-full border-collapse">
                    <thead className="bg-[#0d1117] border-b border-[#21262d]">
                        <tr>
                            {["Campaign Name", "Agent", "Status", "Start Date", "Batch", "Time Slots", "Actions", "Recipients", ""].map((h, i) => (
                                <th key={i} className="text-left px-5 py-3 text-[10px] font-medium tracking-widest uppercase text-[#8b949e] font-mono">
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
                                <tr key={c.id} className="border-t border-[#21262d] hover:bg-[rgba(255,255,255,.02)] transition-colors">
                                    <td className="p-[13px_20px]">
                                        <div className="text-sm font-semibold text-[#e6edf3]">{c.name || ""}</div>
                                        <div className="text-[9px] text-[#8b949e] mt-0.5 font-mono">{c.id}</div>
                                    </td>

                                    <td className="p-[13px_20px] text-[#8b949e] text-xs font-mono">{c.agent_id}</td>

                                    <td className="p-[13px_20px]">
                                        <div className="flex justify-center items-center">
                                            <span className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-full border font-mono ${style.badge}`}>
                                                <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${style.dot}`} />
                                                {c.status || ""}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-[13px_20px] text-xs text-[#8b949e] font-mono">
                                        {c.start_date ? new Date(c.start_date).toLocaleDateString("fr-FR", {
                                            year: "numeric", month: "short", day: "numeric",
                                        }) : ""}
                                    </td>

                                    <td className="p-[13px_20px] text-sm font-semibold text-[#e6edf3] font-mono">
                                        {c.batch_size}
                                    </td>

                                    <td className="p-[13px_20px] text-xs text-[#8b949e] font-mono max-w-40">
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
                                                    className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-full font-mono
                                                    bg-[rgba(63,185,80,.08)] text-[#3fb950] border border-[rgba(63,185,80,.25)]
                                                    ${!hasRecipients ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-[rgba(63,185,80,.15)] transition-colors"}`}>
                                                    <Play size={11} />
                                                    Start
                                                </button>
                                            )}

                                            {c.status === "RUNNING" && (
                                                <button
                                                    onClick={() => updateCampaignStatus(c.id, "PAUSED")}
                                                    className="cursor-pointer bg-[rgba(210,153,34,.08)] border border-[rgba(210,153,34,.25)]
                                                    text-[#d29922] flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-full font-mono
                                                    hover:bg-[rgba(210,153,34,.15)] transition-colors">
                                                    <Pause size={11} />
                                                    Pause
                                                </button>
                                            )}

                                            {c.status === "PAUSED" && (
                                                <button
                                                    onClick={() => updateCampaignStatus(c.id, "RUNNING")}
                                                    className="cursor-pointer bg-[rgba(63,185,80,.08)] text-[#3fb950]
                                                    border border-[rgba(63,185,80,.25)] flex items-center gap-1 text-xs
                                                    font-medium py-1 px-2.5 rounded-full font-mono hover:bg-[rgba(63,185,80,.15)] transition-colors">
                                                    <Play size={11} />
                                                    Resume
                                                </button>
                                            )}

                                            {(c.status === "READY" || c.status === "PAUSED" || c.status === "FAILED" || c.status === "RUNNING") && (
                                                <button
                                                    onClick={() => updateCampaignStatus(c.id, "CANCELLED")}
                                                    className="cursor-pointer bg-[rgba(248,81,73,.08)] text-[#f85149]
                                                    border border-[rgba(248,81,73,.25)] flex items-center gap-1 text-xs
                                                    font-medium py-1 px-2.5 rounded-full font-mono hover:bg-[rgba(248,81,73,.15)] transition-colors">
                                                    <X size={11} />
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                    {/* Recipients status */}
                                    <td className="p-[13px_20px]">
                                        {!hasRecipients || c.status === "DRAFT" ? (
                                            <div className="flex items-center justify-center text-xs gap-1 font-medium font-mono
                                            bg-[rgba(210,153,34,.08)] rounded-full p-[3px_10px] text-[#d29922]
                                            border border-[rgba(210,153,34,.25)]">
                                                <TriangleAlert size={11} />
                                                No File
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-sm gap-2">
                                                <File size={18} stroke="#8b949e" />
                                                <div>
                                                    <div className="text-sm font-semibold text-[#3fb950] font-mono">
                                                        {c.recipients.length}
                                                    </div>
                                                    <div className="text-[10px] text-[#8b949e] font-mono">File Uploaded</div>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    {/* Row actions */}
                                    <td className="p-[13px_20px]">
                                        <div className="flex gap-1 flex-wrap">
                                            <button
                                                aria-label={`Edit ${c.name}`}
                                                onClick={() => handleEdit(c)}
                                                className="cursor-pointer bg-[rgba(88,166,255,.08)] text-[#58a6ff] border rounded-full
                                                text-xs py-1 px-2.5 font-medium font-mono border-[rgba(88,166,255,.25)]
                                                flex items-center gap-1 hover:bg-[rgba(88,166,255,.15)] transition-colors">
                                                <Edit size={11} />
                                                Edit
                                            </button>
                                            <button
                                                aria-label={`Delete campaign ${c.name}`}
                                                onClick={() => handleDelete(c)}
                                                className="cursor-pointer bg-[rgba(248,81,73,.08)] text-[#f85149] border rounded-full
                                                text-xs py-1 px-2.5 font-medium font-mono border-[rgba(248,81,73,.25)]
                                                flex items-center gap-1 hover:bg-[rgba(248,81,73,.15)] transition-colors">
                                                <Trash size={11} />
                                                Delete
                                            </button>
                                            {!hasRecipients || c.status === "DRAFT" ? (
                                                <button
                                                    aria-label={`Upload recipients for ${c.name}`}
                                                    onClick={() => handleUploadFile(c.id)}
                                                    className="cursor-pointer bg-[rgba(88,166,255,.08)] text-[#58a6ff] border rounded-full
                                                    border-[rgba(88,166,255,.25)] flex items-center gap-1 text-xs py-1 px-2.5 font-medium font-mono
                                                    hover:bg-[rgba(88,166,255,.15)] transition-colors">
                                                    <FileUp size={11} />
                                                    Upload
                                                </button>
                                            ) : (
                                                <button
                                                    aria-label={`Delete recipients for ${c.name}`}
                                                    onClick={() => { setSelectedCampaign(c); setShowDeleteRecs(true); }}
                                                    className="cursor-pointer bg-[rgba(210,153,34,.08)] text-[#d29922] border rounded-full
                                                    border-[rgba(210,153,34,.25)] flex items-center gap-1 text-xs py-1 px-2.5 font-medium font-mono
                                                    hover:bg-[rgba(210,153,34,.15)] transition-colors">
                                                    <Trash size={11} />
                                                    Recipients
                                                    <span className="text-[9px] py-px px-1.5 rounded bg-[rgba(210,153,34,.15)] font-mono">
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