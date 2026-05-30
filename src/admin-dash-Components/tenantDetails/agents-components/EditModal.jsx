import { Edit, Cpu, Mic, Volume2, X, Plus } from "lucide-react";
import { useState } from "react";
import { handleUnauthorized } from "../../../utils/auth";

export default function EditModal({onClose, onCancel, selectedAgent, setAgents}) {
    const TABS = ["Basic Info", "Models Config", "Tools"];
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [showFull, setShowFull] = useState(false);

    const models = [
        { key: "llm", label: "Language Model (LLM)", icon: <Cpu size={16} />,
          fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}] },
        { key: "stt", label: "Speech-to-Text (STT)", icon: <Mic size={16} />,
          fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}, {label:"Language", key:"language"}] },
        { key: "tts", label: "Text-to-Speech (TTS)", icon: <Volume2 size={16} />,
          fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}, {label:"Voice", key:"voice"}, {label:"Language", key:"language"}] }
    ];

    const [form, setForm] = useState(() => {
        if (!selectedAgent) return null;
        return { ...selectedAgent, tools: selectedAgent.tools || [], voicemail: selectedAgent.voicemail || { leave_message: false, message: "" } };
    });

    const handleModelChange = (model, key, value) => {
        setForm((prev) => ({
            ...prev,
            models_config: { ...(prev.models_config || {}), [model]: { ...(prev.models_config?.[model] || {}), [key]: value } }
        }));
    };

    if (!form) return null;

    const addTool = () => {
        setForm(prev => ({ ...prev, tools: [...(prev.tools || []), { name: "", url: "", provider: "custom", is_enabled: true }] }));
    };

    const updateTool = (index, key, value) => {
        const updated = [...form.tools];
        updated[index][key] = value;
        setForm(prev => ({ ...prev, tools: updated }));
    };

    const removeTool = (index) => {
        setForm(prev => ({ ...prev, tools: prev.tools.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name: form.name, sip_number: form.sip_number, system_prompt: form.system_prompt,
                greeting_message: form.greeting_message, end_call_message: form.end_call_message || "",
                is_active: form.is_active, tools: form.tools || [], models_config: form.models_config,
                voicemail: form.voicemail || { leave_message: false, message: "" }
            };
            const token = localStorage.getItem("token");
            const res = await fetch(`https://api.voixup.fr/admin/agents/${form.id}/config`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(payload),
            });
            if (res.status === 401) { handleUnauthorized(401); return; }
            const data = await res.json();
            if (!res.ok) throw new Error(data?.detail || "Update failed");
            setAgents(prev => prev.map(a => a.id === form.id ? {...a, ...data} : a));
            onClose();
        } catch (err) {
            console.error(`Failed: ${err?.detail}`);
        }
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]
        backdrop-blur-sm p-5">
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl
            shadow-[0_24px_80px_rgba(0,0,0,0.5)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh] flex flex-col">

                {/* HEADER */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#21262d] shrink-0">
                    <div className="w-9 h-9 rounded-[11px] bg-linear-to-br from-[#1c50a0] to-[#58a6ff]
                    flex items-center justify-center text-white shrink-0">
                        <Edit />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#e6edf3] text-base tracking-tight"
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                            Edit Agent
                        </div>
                        <div className="text-xs text-[#8b949e] mt-0.5">
                            Update agent configuration and models
                        </div>
                    </div>
                    <button onClick={onClose}
                    className="w-7.5 h-7.5 rounded-lg border border-[#30363d]
                    bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer flex items-center
                    justify-center hover:text-[#e6edf3] transition-colors">
                        <X />
                    </button>
                </div>

                {/* TABS */}
                <div className="flex border-b border-[#21262d] shrink-0 px-6">
                    {TABS.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                        style={{
                            padding: "9px 18px", fontSize: 14,
                            fontFamily: "'DM Mono', monospace",
                            fontWeight: activeTab === tab ? 600 : 400,
                            background: "none", border: "none",
                            borderBottom: activeTab === tab ? "2px solid #58a6ff" : "2px solid transparent",
                            color: activeTab === tab ? "#58a6ff" : "#8b949e",
                            cursor: "pointer", marginBottom: -1, transition: "all 0.15s",
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* FORM */}
                <div className="overflow-y-auto flex-1 py-5 px-6">
                    {activeTab === "Basic Info" && (
                    <>
                    <div className="text-xs font-semibold text-[#8b949e] uppercase tracking-widest mb-2.5">
                        Basic Info
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                Agent Name <span className="text-[#f85149]">*</span>
                            </label>
                            <input type="text" value={form.name || ""}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            focus:border-[#58a6ff] transition-colors font-mono" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                SIP Number <span className="text-[#f85149]">*</span>
                            </label>
                            <input value={form.sip_number || ""}
                            onChange={(e) => setForm({...form, sip_number: e.target.value})}
                            type="text"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            focus:border-[#58a6ff] transition-colors font-mono" />
                        </div>
                    </div>
                    {/* Active Toggle */}
                    <div className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-[10px]
                    bg-[rgba(255,255,255,.03)] border border-[#21262d] mb-4">
                        <label className="relative inline-block w-14 h-7 cursor-pointer">
                            <input type="checkbox" checked={form.is_active}
                            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                            className="peer sr-only" />
                            <span className="absolute inset-0 rounded-full bg-[#30363d]
                            transition-all duration-300 peer-checked:bg-[#58a6ff]" />
                            <span className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg
                            transition-all duration-300 peer-checked:translate-x-7" />
                        </label>
                        <label className="text-xs font-medium cursor-pointer text-[#e6edf3]">
                            Agent is {form.is_active ? "Active" : "Inactive"}
                        </label>
                        <span className="text-[#8b949e] text-[10px] ml-auto">
                            Toggle to enable/disable this agent
                        </span>
                    </div>
                    {/* System Prompt */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider">
                                System Prompt <span className="text-[#f85149]">*</span>
                            </label>
                            <button onClick={() => setShowFull(!showFull)}
                            className="text-[10px] px-2.25 py-0.5 rounded-md border border-[rgba(88,166,255,.2)]
                            bg-[rgba(88,166,255,.08)] text-[#58a6ff] cursor-pointer">
                                {showFull ? "Hide" : "Show full"}
                            </button>
                        </div>
                        <textarea value={form.system_prompt || ""}
                        onChange={(e) => setForm({ ...form, system_prompt: e.target.value })}
                        rows={showFull ? 20 : 4}
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                        focus:border-[#58a6ff] resize-y leading-relaxed transition-colors" />
                    </div>
                    {/* Greeting */}
                    <div>
                        <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                            Greeting Message <span className="text-[#f85149]">*</span>
                        </label>
                        <textarea value={form.greeting_message || ""}
                        onChange={(e) => setForm({ ...form, greeting_message: e.target.value })}
                        rows="3"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                        focus:border-[#58a6ff] resize-none leading-relaxed transition-colors" />
                    </div>
                    {/* End Call */}
                    <div>
                        <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                            End Call Message <span className="text-[#f85149]">*</span>
                        </label>
                        <textarea value={form.end_call_message || ""}
                        onChange={(e) => setForm(form => ({...form, end_call_message: e.target.value}))}
                        rows="3"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                        focus:border-[#58a6ff] resize-none leading-relaxed transition-colors" />
                    </div>
                    </>
                    )}

                    {activeTab === "Models Config" && (
                    <>
                    <div className="text-sm font-semibold text-[#8b949e] uppercase tracking-widest mb-2.5">
                        Models Configuration
                    </div>
                    {models.map((model) => (
                        <div key={model.key}
                        className="mb-5 p-4 rounded-xl bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#8b949e]">{model.icon}</span>
                                <span className="text-sm font-bold text-[#e6edf3]">{model.label}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {model.fields.map((field) => (
                                    <div key={field.key}>
                                        <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                            {field.label} <span className="text-[#f85149]">*</span>
                                        </label>
                                        <input
                                        value={form.models_config?.[model.key]?.[field.key] || ""}
                                        onChange={(e) => handleModelChange(model.key, field.key, e.target.value)}
                                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                        focus:border-[#58a6ff] transition-colors font-mono"
                                        placeholder={field.label} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    </>
                    )}

                    {activeTab === "Tools" && (
                    <>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#8b949e]
                    uppercase tracking-widest mb-2.5">
                        <span>Tools</span>
                        <button onClick={addTool}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all
                        bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.2)]">
                            <Plus size={14} />
                            Add Tool
                        </button>
                    </div>
                    {form.tools.length === 0 ? (
                        <div className="py-10 text-center text-sm text-[#8b949e] rounded-xl border border-dashed border-[#30363d]">
                            No tools added yet. Click "Add Tool" to get started.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {(form.tools || []).map((tool, index) => (
                                <div key={index}
                                className="p-4 rounded-xl relative bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-bold text-[#8b949e] uppercase tracking-widest">
                                            Tool #{index + 1}
                                        </span>
                                        <button onClick={() => removeTool(index)}
                                        className="text-[#8b949e] hover:text-[#f85149] transition-colors">
                                            <X size={21} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        <div>
                                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                                Name <span className="text-[#f85149]">*</span>
                                            </label>
                                            <input type="text" value={tool.name}
                                            onChange={(e) => updateTool(index, "name", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                            focus:border-[#58a6ff] transition-colors font-mono" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                                URL <span className="text-[#f85149]">*</span>
                                            </label>
                                            <input type="text" placeholder="https://api.example.com/"
                                            value={tool.url} onChange={(e) => updateTool(index, "url", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                            focus:border-[#58a6ff] transition-colors font-mono" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                                Provider <span className="text-[#f85149]">*</span>
                                            </label>
                                            <input type="text" value={tool.provider}
                                            onChange={(e) => updateTool(index, "provider", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                            focus:border-[#58a6ff] transition-colors font-mono" required />
                                        </div>
                                        <div className="flex items-end">
                                            <label className="flex items-center gap-2 cursor-pointer pb-2">
                                                <input type="checkbox" checked={tool.is_enabled}
                                                onChange={(e) => updateTool(index, "is_enabled", e.target.checked)} />
                                                <span className="text-xs text-[#8b949e]">Enabled</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t
                border-[#21262d] bg-[rgba(255,255,255,.02)] shrink-0">
                    <div className="flex gap-2.5">
                        <button onClick={onCancel}
                        className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#8b949e]
                        hover:text-[#e6edf3] transition-colors border border-[#30363d]
                        bg-[rgba(255,255,255,.04)]">
                            Cancel
                        </button>
                        <button onClick={handleSubmit}
                        className="cursor-pointer px-6 py-2.5 rounded-xl text-sm font-bold text-white
                        transition-all flex items-center gap-1.5
                        bg-linear-to-r from-[#1c50a0] to-[#58a6ff] border border-[rgba(88,166,255,.25)]
                        shadow-[0_4px_14px_rgba(88,166,255,.2)] hover:opacity-90">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}