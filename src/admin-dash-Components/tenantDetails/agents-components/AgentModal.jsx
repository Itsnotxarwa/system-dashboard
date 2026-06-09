import { X } from "lucide-react";
import { useState } from "react";
import BasicInfo from "./basicInfo";
import ModelsConfig from "./modelsConfig";
import Tools from "./Tools";
import VoiceMail from "./VoiceMail";
import apiFetch from "../../shared/ApiFetch";

export default function AgentModal({selectedTenant, onClose, onCancel, setAgents}) {
    const TABS = ["Basic Info", "Models Config", "Tools", "Voicemail"];
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [loading, setLoading] = useState(false);

    const [agentData, setAgentData] = useState({
        name: "",
        type: "inbound",
        sip_number: "",
        system_prompt: "",
        greeting_message: "",
        end_call_message: "",
        tools: [],
        models_config: {
            llm: { provider: "", model_name: "" },
            stt: { provider: "", model_name: "", language: "" },
            tts: { provider: "", model_name: "", voice: "", language: "" }
        },
        voicemail: {
            leave_message: false,
            message: ""
        }
    });

    const createAgent = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const tenantId = selectedTenant?.id;
            const payload = { ...agentData, tools: agentData.tools || [] };
            const response = await apiFetch(
                `https://api.mazia.ai/admin/tenants/${tenantId}/agents`,
                {
                    method: "POST",
                    body: JSON.stringify(payload)
                }
            );

            if (!response) return;

            const data = await response.json();
            console.log(data);
            if (!response.ok) throw new Error(data?.detail || "Creation failed");
            setAgents(prev => [...prev, data]);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error creating agent");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(0,0,0,0.6)] backdrop-blur-sm p-5">
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl
            shadow-[0_24px_80px_rgba(0,0,0,0.5)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh]
            flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#21262d] shrink-0
                bg-[#161b22]">
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#e6edf3] text-base tracking-tight"
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                            Create Agent
                        </div>
                        <div className="text-[10px] text-[#8b949e] mt-0.5 truncate">
                            {selectedTenant?.name} - {selectedTenant?.id}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium
                        bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.25)]">
                            New Agent
                        </span>
                        <button
                        onClick={onClose}
                        className="w-7.5 h-7.5 rounded-lg border border-[#30363d]
                        bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer flex items-center
                        justify-center hover:text-[#e6edf3] transition-colors">
                            <X />
                        </button>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex border-b border-[#21262d] shrink-0 px-6">
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
                            borderBottom: activeTab === tab ? "2px solid #58a6ff" : "2px solid transparent",
                            color: activeTab === tab ? "#58a6ff" : "#8b949e",
                            cursor: "pointer",
                            marginBottom: -1,
                            transition: "all 0.15s",
                        }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex-1 px-6 py-5 overflow-y-auto">
                    {activeTab === "Basic Info" && (
                        <BasicInfo selectedTenant={selectedTenant} agentData={agentData} setAgentData={setAgentData} />
                    )}
                    {activeTab === "Models Config" && (
                        <ModelsConfig agentData={agentData} setAgentData={setAgentData} />
                    )}
                    {activeTab === "Tools" && (
                        <Tools agentData={agentData} setAgentData={setAgentData} />
                    )}
                    {activeTab === "Voicemail" && (
                        <VoiceMail agentData={agentData} setAgentData={setAgentData} />
                    )}
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
                        onClick={createAgent}
                        disabled={loading}
                        className={`cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white
                        transition-all flex items-center gap-1.5
                        ${loading ? "opacity-50 cursor-not-allowed" : "bg-linear-to-r from-[#1c50a0] to-[#58a6ff] border border-[rgba(88,166,255,.25)] shadow-[0_4px_14px_rgba(88,166,255,.2)]"}`}>
                            {loading ? "Creating..." : "Create Agent"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}