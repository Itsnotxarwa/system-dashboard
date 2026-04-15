import { Edit, Cpu, Mic, Volume2, X, Plus } from "lucide-react";
import { useState } from "react";
import { handleUnauthorized } from "../../utils/auth";

export default function EditModal({onClose, onCancel, selectedAgent, setAgents}) {
    const TABS = ["Basic Info", "Models Config", "Tools"];
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [showFull, setShowFull] = useState(false);

    const models = [
        { 
            key: "llm", 
            label: "Language Model (LLM)", 
            icon: <Cpu size={16} />, 
            fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}] },
        { 
            key: "stt", 
            label: "Speech-to-Text (STT)", 
            icon: <Mic size={16} />, 
            fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}, {label:"Language", key:"language"}] },
        { 
            key: "tts", 
            label: "Text-to-Speech (TTS)", 
            icon: <Volume2 size={16} />, 
            fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"},{label:"Voice", key:"voice"}, {label:"Language", key:"language"}] }
    ];

    const [form, setForm] = useState(() => {
        if (!selectedAgent) return null;

        return {
        ...selectedAgent,
        tools: selectedAgent.tools || [],
        voicemail: selectedAgent.voicemail || {
            leave_message: false,
            message: ""
        }
        };
    });

    const handleModelChange = (model, key, value) => {
        setForm((prev) => ({
            ...prev,
            models_config: {
            ...(prev.models_config || {}),
            [model]: {
                ...(prev.models_config?.[model] || {}),
                [key]: value
            }
            }
        }));
    };

    if (!form) return null;

    const addTool = () => {
    setForm(prev => ({
        ...prev,
        tools: [
        ...(prev.tools || []),
        { name: "", url: "", provider: "custom", is_enabled: true }
        ]
    }));
    };

    const updateTool = (index, key, value) => {
        const updated = [...form.tools];
        updated[index][key] = value;

        setForm(prev => ({
            ...prev,
            tools: updated
        }));
    };

    const removeTool = (index) => {
        setForm(prev => ({
            ...prev,
            tools: prev.tools.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
            name: form.name,
            sip_number: form.sip_number,
            system_prompt: form.system_prompt,
            greeting_message: form.greeting_message,
            end_call_message: form.end_call_message || "",
            is_active: form.is_active,
            tools: form.tools || [],
            models_config: form.models_config,
            voicemail: form.voicemail || {
                leave_message: false,
                message: ""
            }
            };

        console.log("SENDING:", payload);

        const token = localStorage.getItem("token");
        const res = await fetch(
        `https://api.voixup.fr/admin/agents/${form.id}/config`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify(payload),
        }
        );

        if (res.status === 401) {
            handleUnauthorized(401);
            return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data?.detail || "Update failed");

        setAgents(prev => prev.map(a => a.id === form.id ? {...a, ...data} : a)); 
        onClose();
    } catch (err) {
        console.error(`Failed: ${err?.detail}`);
    }
    };
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.38)] 
        backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl  
            shadow-[0_24px_80px_rgba(3,44,166,0.18)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh]
            flex flex-col">
                {/* HEADER */}
                <div className="flex items-center gap-3 px-6 py-5 border-b shrink-0 border border-[rgba(3,44,166,0.08)]
                bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
                    <div className="w-9 h-9 rounded-[11px] bg-linear-to-br from-[#032ca6] to-[#1a6bff]
                    flex items-center justify-center text-white shrink-0">
                        <Edit />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-base tracking-tight" 
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif;"}}>
                            Edit Agent
                        </div>
                        <div className="text-xs text-[#9aabca] mt-0.5">
                            Update agent configuration and models
                        </div>
                    </div>
                    <button 
                    onClick={onClose}
                    className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                    bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                    justify-center" 
                    >
                        <X />
                    </button>
                </div>

                {/* TABS */}
                <div className="flex border-b shrink-0 px-6 border border-[rgba(3,44,166,0.08)]">
                    {TABS.map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: "9px 18px",
                            fontSize: 12,
                            fontFamily: "'DM Mono', monospace",
                            fontWeight: activeTab === tab ? 600 : 400,
                            background: "none",
                            border: "none",
                            borderBottom: activeTab === tab ? "2px solid #032ca6" : "2px solid transparent",
                            color: activeTab === tab ? "#032ca6" : "#9aabca",
                            cursor: "pointer",
                            marginBottom: -1,
                            transition: "all 0.15s",
                        }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* FORM */}
                <div className="overflow-y-auto flex-1 py-5 px-6">
                    {/* BASIC INFO */}
                    {activeTab === "Basic Info" && (
                    <>
                    <div className="text-[10px] font-semibold text-[#9aabca] uppercase tracking-widest mb-2.5">
                        Basic Info
                    </div>
                    {/* Name and SIP Number */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                            tracking-wider mb-1.5">
                                Agent Name <span className="text-[#ef4444]">*</span>
                            </label>
                            <input 
                            type="text" 
                            value={form.name || ""}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            border-gray-300 placeholder-gray-400
                            focus:border-[#032ca6]"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                            tracking-wider mb-1.5">
                                SIP Number <span className="text-[#ef4444]">*</span>
                            </label>
                            <input 
                            value={form.sip_number || ""}
                            onChange={(e) => setForm({...form, sip_number: e.target.value})}
                            type="text" 
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            border-gray-300 placeholder-gray-400
                            focus:border-[#032ca6]" 
                            />
                        </div>
                    </div>
                    {/* Active Toggle */}
                    <div className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-[10px]
                    bg-[rgba(3,44,166,.03)] border border-[rgba(3,44,166,.09)] mb-4">
                        <input 
                        type="checkbox"
                        checked={form.is_active} 
                        onChange={(e) =>
                            setForm({ ...form, is_active: e.target.checked })
                        }
                        className="w-3.5 h-3.5 accent-[#032ca6] shrink-0" />
                        <label className="text-xs font-medium cursor-pointer text-[#374151]">
                            Agent is {form.is_active ? "Active" : "Inactive"}
                        </label>
                        <span className="text-[#9aabca] text-[10px] ml-auto">
                            Toggle to enable/disable this agent
                        </span>
                    </div>
                    {/* System Prompt */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                            tracking-wider">
                                System Prompt <span className="text-[#ef4444]">*</span>
                            </label>
                            <button
                            onClick={() => setShowFull(!showFull)}
                            className="text-[9px] px-2.25 py-0.5 rounded-md border border-[rgba(3,44,166,.14)] 
                            bg-[rgba(3,44,166,.05)] text-[#032ca6] cursor-pointer"
                            >
                                {showFull ? "Hide" : "Show full"}
                            </button>
                        </div>
                        <textarea 
                        value={form.system_prompt || ""}
                        onChange={(e) => setForm({ ...form, system_prompt: e.target.value })}
                        rows={showFull ? 20 : 4}
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6] resize-y leading-relaxed" 
                        >
                        </textarea>
                    </div>
                    {/* Greeting Message */}
                    <div>
                        <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                        tracking-wider mb-1.5">
                            Greeting Message <span className="text-[#ef4444]">*</span>
                        </label>
                        <textarea 
                        value={form.greeting_message || ""}
                        onChange={(e) => setForm({ ...form, greeting_message: e.target.value })}
                        rows="3" 
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6] resize-none leading-relaxed" ></textarea>
                    </div>
                    {/* End Call Message */}
                    <div>
                        <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                    tracking-wider mb-1.5">
                        End Call Message <span className="text-[#ef4444]">*</span>
                    </label>
                    <textarea 
                    value={form.end_call_message || ""}
                    onChange={(e) =>
                        setForm(form => ({
                        ...form,
                        end_call_message: e.target.value
                        }))
                    }
                    rows="3" 
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                    border-gray-300 placeholder-gray-400
                    focus:border-[#032ca6] resize-none leading-relaxed" ></textarea>
                    </div>
                    </>
                    )}
                    {/* Models */}
                    {activeTab === "Models Config" && (
                    <>
                    <div className="text-[10px] font-semibold text-[#9aabca] uppercase tracking-widest mb-2.5">
                        Models Configuration
                    </div>
                    <div>
                        {models.map((model) => (
                            <div
                            key={model.key}
                            className="mb-5 p-4 rounded-xl bg-[rgba(3,44,166,0.03)] border
                            border-[rgba(3,44,166,0.09)]"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span>
                                        {model.icon}
                                    </span>
                                    <span className="text-xs font-bold text-slate-700">
                                        {model.label}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {model.fields.map((field) => (
                                        <div key={field.key}>
                                            <label 
                                            className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                            tracking-wider mb-1.5">
                                                {field.label} <span className="text-[#ef4444]">*</span>
                                            </label>
                                            <input
                                            value={form.models_config?.[model.key]?.[field.key] || ""}
                                            onChange={(e) => handleModelChange(model.key, field.key, e.target.value)}
                                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                            border-gray-300 placeholder-gray-300 text-slate-800
                                            focus:border-[#032ca6] bg-white/90"
                                            placeholder={field.label}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                    )}
                    {/* TOOLS */}
                    {activeTab === "Tools" && (
                    <>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-[#9aabca] 
                    uppercase tracking-widest mb-2.5">
                        <span>Tools</span>
                        <button 
                        onClick={addTool}
                        className="flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all bg-[rgba(3,44,166,0.08)]
                        text-[#032ca6] border-[rgba(3,44,166,0.16)]">
                            <Plus />
                            Add Tool
                        </button>
                    </div>
                    <div>
                        {form.tools.length === 0 ? (
                            <div className="py-10 text-center text-[11px] text-slate-300 rounded-xl border-dashed border-[rgba(3,44,166,0.15)]">
                                No tools added yet. Click "Add Tool" to get started.
                            </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {(form.tools || []).map((tool, index) => (
                                        <div
                                        key={index}
                                        className="p-4 rounded-xl relative bg-[rgba(3,44,166,0.03)]
                                        border border-[rgba(3,44,166,0.10)]">

                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                    Tool #{index + 1}
                                                </span>
                                                <button
                                                onClick={() => removeTool(index)}
                                                className="text-slate-300 hover:text-red-400 transition-colors text-base"
                                                >
                                                    <X />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2.5">
                                                <div>
                                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                                    tracking-wider mb-1.5">
                                                        Name <span className="text-[#ef4444]">*</span>
                                                    </label>
                                                    <input 
                                                    type="text" 
                                                    value={tool.name}
                                                    onChange={(e) => updateTool(index, "name", e.target.value)}
                                                    placeholder="" 
                                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                                    border-gray-300 placeholder-gray-400
                                                    focus:border-[#032ca6]"
                                                    required />
                                                </div>
                                
                                                <div>
                                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                                    tracking-wider mb-1.5">
                                                        URL <span className="text-[#ef4444]">*</span>
                                                    </label>
                                                    <input 
                                                    type="text" 
                                                    placeholder="https://api.example.com/" 
                                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                                    border-gray-300 placeholder-gray-400
                                                    focus:border-[#032ca6]"
                                                    value={tool.url}
                                                    onChange={(e) => updateTool(index, "url", e.target.value)}
                                                    required />
                                                </div>
                                
                                                <div>
                                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                                    tracking-wider mb-1.5">
                                                        Provider <span className="text-[#ef4444]">*</span>
                                                    </label>
                                                    <input 
                                                    type="text" 
                                                    value={tool.provider}
                                                    onChange={(e) => updateTool(index, "provider", e.target.value)}
                                                    placeholder="" 
                                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                                    border-gray-300 placeholder-gray-400
                                                    focus:border-[#032ca6]"
                                                    required />
                                                </div>

                                                <div className="flex items-end">
                                                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                                                        <input 
                                                        type="checkbox"
                                                        checked={tool.is_enabled}
                                                        onChange={(e) => updateTool(index, "is_enabled", e.target.checked)}
                                                        />
                                                        <span className="text-[11px] text-slate-600">Enabled</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                    </>
                    )}
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
                        onClick={handleSubmit}
                        className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white 
                        transition-all flex items-center gap-1.5 bg-[#032ca6] border border-[#032ca6]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}