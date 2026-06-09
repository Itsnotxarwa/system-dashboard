import { Plus, X } from "lucide-react";
import { useState } from "react";
import { handleUnauthorized } from "../../../utils/auth";

export default function CreateCampaign({ tenant, onClose, onCancel, agents, setCampaigns }) {
    const [loading, setLoading] = useState(false);

    const [campaignData, setCampaignData] = useState({
        name: "",
        agent_id: "",
        start_date: "",
        batch_size: 1,
        time_slots: [],
    });

    const addTimeSlot = () => {
        setCampaignData(prev => ({
            ...prev,
            time_slots: [...prev.time_slots, { start_time: "", end_time: "" }],
        }));
    };

    const removeTimeSlot = (index) => {
        setCampaignData(prev => ({
            ...prev,
            time_slots: prev.time_slots.filter((_, i) => i !== index),
        }));
    };

    const handleTimeSlotChange = (index, field, value) => {
        setCampaignData(prev => {
            const updatedSlots = [...prev.time_slots];
            updatedSlots[index] = { ...updatedSlots[index], [field]: value };
            return { ...prev, time_slots: updatedSlots };
        });
    };

    const createCampaign = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const tenantId = tenant?.id;
            const res = await fetch(`https://api.mazia.ai/tenants/${tenantId}/campaign`, {
                method: "POST",
                credentials: "include",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: campaignData.name,
                    agent_id: campaignData.agent_id,
                    start_date: campaignData.start_date,
                    batch_size: campaignData.batch_size,
                    time_slots: campaignData.time_slots,
                }),
            });
            if (res.status === 401) { handleUnauthorized(401); return; }
            const data = await res.json();
            if (!res.ok) throw new Error(data?.detail || "Creation failed");
            setCampaigns(prev => [...prev, data]);
            onClose();
        } catch (error) {
            console.error(error);
            alert(`Failed: ${error?.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(0,0,0,0.6)] backdrop-blur-sm p-5">
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl
            shadow-[0_24px_80px_rgba(0,0,0,0.5)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh]
            flex flex-col">

                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#21262d] shrink-0">
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#e6edf3] text-base tracking-tight"
                            style={{ fontFamily: "'Cabinet Grotesk',sans-serif" }}>
                            New Campaign
                        </div>
                        <div className="text-[10px] text-[#8b949e] mt-0.5 truncate">
                            Fill in the campaign details below
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium
                        bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.25)]">
                            New Campaign
                        </span>
                        <button
                            className="w-7.5 h-7.5 rounded-lg border border-[#30363d]
                            bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer flex items-center
                            justify-center hover:text-[#e6edf3] transition-colors"
                            onClick={onClose}>
                            <X />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="overflow-y-auto scroll flex-1 px-6 py-5 space-y-4">
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Campaign Name <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                            value={campaignData.name}
                            onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                            placeholder="My campaign"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            focus:border-[#58a6ff] transition-colors font-mono"
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Agent <span className="text-[#f85149]">*</span>
                        </label>
                        <select
                            value={campaignData.agent_id}
                            onChange={(e) => setCampaignData({ ...campaignData, agent_id: e.target.value })}
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                            focus:border-[#58a6ff] transition-colors cursor-pointer">
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
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Start Date <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                            focus:border-[#58a6ff] transition-colors"
                            value={campaignData.start_date}
                            onChange={(e) => setCampaignData({ ...campaignData, start_date: e.target.value })}
                            type="date"
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Batch Size <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                            focus:border-[#58a6ff] transition-colors font-mono"
                            value={campaignData.batch_size}
                            onChange={(e) => setCampaignData({ ...campaignData, batch_size: Number(e.target.value) })}
                            type="number" min={1} max={500}
                        />
                    </div>

                    {/* Time Slots */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] text-[#8b949e] tracking-wider uppercase">
                                Time Slots <span className="text-[#f85149]">*</span>
                            </label>
                            <button
                                className="text-[10px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1
                                bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.2)]"
                                onClick={addTimeSlot}>
                                <Plus size={12} />
                                Add Slot
                            </button>
                        </div>

                        {campaignData.time_slots.length === 0 && (
                            <p className="text-[11px] text-[#8b949e] text-center py-3 border border-dashed
                            border-[#30363d] rounded-xl">
                                No time slots added yet
                            </p>
                        )}

                        <div className="space-y-2">
                            {campaignData.time_slots.map((slot, index) => (
                                <div key={index}
                                    className="flex items-center gap-2 p-[10px_12px] rounded-[10px]
                                    bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                                    <span className="text-xs text-[#8b949e] whitespace-nowrap">Start</span>
                                    <input
                                        type="time"
                                        value={slot.start_time}
                                        onChange={(e) => handleTimeSlotChange(index, "start_time", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                        bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                        focus:border-[#58a6ff] transition-colors"
                                    />
                                    <span className="text-xs text-[#8b949e] whitespace-nowrap">End</span>
                                    <input
                                        type="time"
                                        value={slot.end_time}
                                        onChange={(e) => handleTimeSlotChange(index, "end_time", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                        bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                        focus:border-[#58a6ff] transition-colors"
                                    />
                                    <button
                                        className="w-6 h-6 shrink-0 rounded-md border border-[rgba(248,81,73,.25)]
                                        bg-[rgba(248,81,73,.08)] text-[#f85149] cursor-pointer flex items-center
                                        justify-center hover:bg-[rgba(248,81,73,.15)] transition-colors"
                                        onClick={() => removeTimeSlot(index)}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t
                border-[#21262d] bg-[rgba(255,255,255,.02)] shrink-0">
                    <div className="flex gap-2.5">
                        <button
                            onClick={onCancel}
                            className="cursor-pointer px-5 py-2.5 rounded-xl text-xs font-medium text-[#8b949e]
                            hover:text-[#e6edf3] transition-colors border border-[#30363d]
                            bg-[rgba(255,255,255,.04)]">
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            onClick={createCampaign}
                            className={`cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white
                            transition-all flex items-center gap-1.5
                            ${loading ? "opacity-50 cursor-not-allowed" : "bg-linear-to-r from-[#1c50a0] to-[#58a6ff] border border-[rgba(88,166,255,.25)] shadow-[0_4px_14px_rgba(88,166,255,.2)]"}`}>
                            {loading ? "Creating..." : "Create Campaign"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}