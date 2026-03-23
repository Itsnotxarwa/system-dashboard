import { X } from "lucide-react";
import { useState } from "react";
import BasicInfo from "./basicInfo";
import ModelsConfig from "./modelsConfig";
import Tools from "./Tools";
import VoiceMail from "./VoiceMail";

export default function AgentModal({selectedTenant, onClose, onCancel}) {
    const TABS = ["Basic Info", "Models Config", "Tools", "Voicemail"];
    const [activeTab, setActiveTab] = useState(TABS[0]);
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
                            Create Agent
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                            {selectedTenant?.name} - {selectedTenant?.id}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-[rgba(3,44,166,0.07)]
                        text-[#032ca6] border border-[rgba(3,44,166,0.14)]">
                            New Agent
                        </span>
                        <button 
                        onClick={onClose} 
                        className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                        bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                        justify-center" 
                        >
                            <X />
                        </button>
                    </div>
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

                <div className="flex-1 px-6 py-5 overflow-y-auto">
                    {/* BASIC INFO */}
                    {activeTab === "Basic Info" && (
                        <BasicInfo selectedTenant={selectedTenant} />
                    )}
                    {/* MODELS CONFIG */}
                    {activeTab === "Models Config" && (
                        <ModelsConfig selectedTenant={selectedTenant} />
                    )}
                    {/* Tools */}
                    {activeTab === "Tools" && (
                        <Tools selectedTenant={selectedTenant} />
                    )}
                    {/* Voicemail */}
                    {activeTab === "Voicemail" && (
                        <VoiceMail selectedTenant={selectedTenant} />
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
                        onClick={onClose} 
                        className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white 
                        transition-all flex items-center gap-1.5 bg-[#032ca6] border border-[#032ca6]" 
                        style={{boxShadow:"0 4px 14px rgba(3,44,166,0.25)"}}>
                            Create Agent
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}