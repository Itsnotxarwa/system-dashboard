import { File, Paperclip, Plus, X, FileCheckCorner } from "lucide-react";
import { useState } from "react";
import { handleUnauthorized } from "../../../utils/auth";

export default function CreateCampaign({tenant, onClose, onCancel, agents, handleDrop, handleDragOver, 
    handleFileChange, file, setFile, setCampaigns}) {
    const [showSlot, setShowSlot] = useState(false);
    const [loading, setLoading] = useState(false)
    

    const [campaignData, setCampaignData] = useState({
        name: "",
        agent_id: "",
        start_date: "",
        batch_size: 1,
        time_slots: [{
            start_time: "",
            end_time: "",
        }],
        recipients: [{
            id: "",
            phone: "",
            status: "",
            call_attempts: "",
        }]
    })
    const handleTimeSlotChange = (index, field, value) => {
        const updatedSlots = [...campaignData.time_slots];
        updatedSlots[index][field] = value;

        setCampaignData({
        ...campaignData,
        time_slots: updatedSlots
        });
    };

    
    const createCampaign = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const tenantId = tenant?.id;

            const formData = new FormData();

            formData.append("name", campaignData.name);
            formData.append("agent_id", campaignData.agent_id);
            formData.append("start_date", campaignData.start_date);
            formData.append("batch_size", campaignData.batch_size);
            formData.append("time_slots", JSON.stringify(campaignData.time_slots));

            const res = await fetch(`https://api.voixup.fr/tenants/${tenantId}/campaigns`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }

            const data = await res.json();

            console.log(data);
            
            if (!res.ok) {
                throw new Error(data?.detail || "Creation failed");
            }

            let newCampaign = data;

         if (file) {
    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const uploadRes = await fetch(
        `https://api.voixup.fr/tenants/${tenantId}/campaigns/${data.id}/recipients/upload`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: uploadForm,
        }
    );

    if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        newCampaign = {
            ...data,
            recipients: Array.from({ length: uploadData.valid_recipients || 0 }, (_, i) => ({ id: i }))
        };
    }

    const uploadData = await uploadRes.json();

    newCampaign = {
        ...data,
        recipients: Array.from({ length: uploadData.valid_recipients || 0 }, (_, i) => ({ id: i }))
    };
}

            setCampaigns(prev => [...prev, newCampaign]);
            onClose();
            window.location.reload();

            } catch (error) {
                console.error(error);
                alert(`Failed: ${error?.detail}`);
            }finally {
                setLoading(false)
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
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-base tracking-tight" 
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif;"}}>
                            New Campaign
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                            Fill in the campaign details below
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-[rgba(3,44,166,0.07)]
                        text-[#032ca6] border border-[rgba(3,44,166,0.14)]">
                            New Campaign
                        </span>
                        <button 
                        className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                        bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                        justify-center" 
                        onClick={onClose}
                        >
                            <X />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="overflow-y-auto scroll flex-1 px-6 py-5 space-y-4">
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Campaign Name <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                        placeholder="My campaign"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Agent ID <span className="text-[#ef4444]">*</span>
                        </label>
                        <select
                        value={campaignData.agent_id}
                        onChange={(e) => setCampaignData({...campaignData, agent_id: e.target.value})}
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        >
                            <option value="">Select an agent</option>
                            {agents
                                ?.filter((agent) => agent.type === "outbound")
                                    .map((agent) => (
                                    <option key={agent.id} value={agent.id}>
                                        {agent.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Start Date <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        value={campaignData.start_date}
                        onChange={(e) => setCampaignData({...campaignData, start_date: e.target.value})}
                        type="date" />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Batch Size <span className="text-[#ef4444]">*</span>
                        </label>
                        <input 
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        value={campaignData.batch_size}
                        onChange={(e) => setCampaignData({...campaignData, batch_size: Number(e.target.value)})}
                        type="number" min={1} max={500} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Time Slots <span className="text-[#ef4444]">*</span>
                        </label>
                        <button className="text-[10px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1
                        bg-[rgba(3,44,166,.08)] text-[#032ca6] border border-[rgba(3,44,166,.16)]"
                        onClick={() => setShowSlot(true)}>
                            <Plus size={12} />
                            Add Slot
                        </button>
                    </div>
                    {showSlot && (
                        <div className="flex items-center gap-2 p-[10px_12px] rounded-[10px] bg-[rgba(3,44,166,.03)]
                        border border-[rgba(3,44,166,.09)]">
                            <span className="text-xs text-[#7a8bb5] flex-nowrap">
                                Start
                            </span>
                            <input 
                            type="time"
                            value={campaignData.time_slots[0].start_time}
                            onChange={(e) =>
                                handleTimeSlotChange(0, "start_time", e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            border-gray-300 placeholder-gray-400
                            focus:border-[#032ca6]" />
                            <span className="text-xs text-[#7a8bb5] flex-nowrap">
                                End
                            </span>
                            <input 
                            type="time"
                            value={campaignData.time_slots[0].end_time}
                            onChange={(e) =>
                                handleTimeSlotChange(0, "end_time", e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            border-gray-300 placeholder-gray-400
                            focus:border-[#032ca6]" />
                            <div className="flex justify-center items-center">
                                <button className="w-6 h-6 rounded-md border border-[rgba(220,38,38,.18)]
                                bg-[rgba(220,38,38,.06)] text-[#dc2626] text-sm cursor-pointer flex items-center
                                justify-center"
                                onClick={() => {
                                    setShowSlot(false);
                                    setCampaignData({
                                        ...campaignData,
                                        time_slots: [
                                            { start_time: "", end_time: "" }
                                        ]
                                    });
                                    }
                                }>
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-[rgba(3,44,166,.08)]"></div>
                        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
                            Recipients
                        </span>
                        <div className="flex-1 h-px bg-[rgba(3,44,166,.08)]"></div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[#9aabca] font-semibold text-xs">
                                Upload Recipients {" "}
                                <span className="text-[#9aabca] font-normal">(optional)</span>
                            </label>
                            <span className="text-[9px] px-2 py-0.5 rounded-md bg-[rgba(3,44,166,.06)]
                            text-[#7a8bb5] border border-[rgba(3,44,166,.10)]">
                                CSV 
                            </span>
                        </div>
                        {/* DROP ZONE */}
                        <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-dashed border-[rgba(3,44,166,.20)] rounded-xl bg-[rgba(3,44,166,.025)]
                        text-center cursor-pointer p-[20px_16px] transition-all duration-200">
                            <label className="cursor-pointer block">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {file ? (
                                    <div className="flex justify-center items-center text-[#059669]">
                                        <FileCheckCorner />
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center mb-1.5">
                                        <Paperclip />
                                    </div>
                                )}
                                {file ? (
                                    <div>
                                    <p className="text-xs font-semibold text-[#059669] mb-1">
                                        {file.name}
                                    </p>
                                    <p className="text-[11px] text-[#9aabca]">
                                        {(file.size / 1024).toFixed(1) + " KB"}
                                    </p>
                                    </div>
                                ) : (
                                    <p className="text-xs font-semibold text-[#374151] mb-1">
                                    Drop your file here or {" "}
                                    <span className="text-[#032ca6]">
                                        browse
                                    </span>
                                    </p>
                                )}
                            </label>
                        </div>

                        {/* FILE INFO */}
                        {file &&
                        <div className="mt-2 flex items-center justify-between px-3 py-2 rounded-lg
                        bg-[rgba(5,150,105,.06)] border border-[rgba(5,150,105,.18)]">
                            <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center text-[#059669]">
                                    <File />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-[#059669]">
                                        {file.name}
                                    </div>
                                    <div className="mt-0.5 text-[#9aabca] text-[11px]">
                                        {(file.size / 1024).toFixed(1) + " KB"}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setFile(null)}
                                className="text-[16px] text-[#dc2626] bg-transparent border-none 
                                cursor-pointer p-0 flex items-center justify-center"
                            >
                                <X />
                            </button>
                        </div>
                        }
                    </div>
                    </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t
                border-[rgba(3,44,166,0.08)] bg-[rgba(3,44,166,0.015)] shrink-0">
                    <div className="flex gap-2.5">
                        <button  
                        onClick={onCancel}
                        className="cursor-pointer px-5 py-2.5 rounded-xl text-xs font-medium text-slate-500 
                        hover:text-slate-700 transition-all border border-[rgba(3,44,166,0.13)]
                        bg-[rgba(3,44,166,0.04)]">
                            Cancel
                        </button>
                        <button 
                        disabled={loading}
                        onClick={createCampaign}
                        className={`cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white 
                            ${loading ? "opacity-50 cursor-not-allowed" : "bg-[#032ca6] border border-[#032ca6]"}
                        transition-all flex items-center gap-1.5`}
                        style={{boxShadow:"0 4px 14px rgba(3,44,166,0.25)"}}>
                            {loading ? "Creating..." : "Create Campaign"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}