import { ChevronRight, Plus } from "lucide-react";
import AgentsList from "../agents-components/AgentsList";

export default function TenantContent({tenant, agents, activeNav, setShowAgentModal}) {
    return(
        <div className="flex-1 flex flex-col min-h-screen">
            {/* TOP BAR */}
            <div className="h-14 bg-white border-b flex items-center px-7 py-2 gap-4 shrink-0
            border-[rgba(3,44,166,.08)]">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <a href="/" className="hover:text-slate-600">Tenants</a>
                    <ChevronRight size={14} />
                    <span className="text-slate-700 font-medium">{tenant?.name || ""}</span>
                    <ChevronRight size={14} />
                    <span className="text-slate-500">
                        {activeNav.name}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 ml-2">
                    <span className={`w-1.5 h-1.5 rounded-full
                        ${tenant?.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#6b7280] shadow-[0_0_5px_#6b7280]"}`}></span>
                    <span className="text-[10px] text-slate-400">
                        {tenant?.is_active ? "Active" : "Inactive"}
                    </span>
                </div>

                <div className="ml-auto flex items-center gap-2.5">
                    {activeNav.name === "Agents" && (
                    <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                    text-xs font-bold text-white transition-all bg-[#032ca6]
                    border border-[#032ca6] shadow-[0_4px_14px_rgba(3,44,166,0.25)] cursor-pointer"
                    onClick={() => {
                        setShowAgentModal(true)
                    }}>
                        <Plus />
                        Add Agent
                    </button>
                    )}
                </div>
            </div>
            <div className="flex-1 px-6 py-5 overflow-y-auto">
                {activeNav.name === "Agents" && (
                    <AgentsList agents={agents} />
                )}
                {activeNav.name === "Call Records" && (
                    <div></div>
                )}
            </div>
        </div>    
    )
}