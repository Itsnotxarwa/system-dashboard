import { ChevronRight, Plus } from "lucide-react";

export default function TopBar({tenant, activeNav, activeItem, setShowAgentModal, setShowCreateModal}) {
    return(
        <div className="h-14 bg-[#161b22] border-b flex items-center px-7 py-2 gap-4 shrink-0
        border-[#21262d]">
            <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                <a href="/" className="hover:text-[#e6edf3] transition-colors">Tenants</a>
                <ChevronRight size={14} />
                <span className="text-[#e6edf3] font-medium">{tenant?.name || ""}</span>
                <ChevronRight size={14} />
                <span className="text-[#8b949e]">
                    {activeNav.name}
                </span>
                {activeItem && (
                    <>
                        <ChevronRight size={14} />
                        <span className="text-[#e6edf3] font-medium">
                            {activeItem}
                        </span>
                    </>
                )}
            </div>

            <div className="flex items-center gap-1.5 ml-2">
                <span className={`w-1.5 h-1.5 rounded-full
                    ${tenant?.is_active ? "bg-[#3fb950] shadow-[0_0_5px_#3fb950]" : "bg-[#8b949e] shadow-[0_0_5px_#8b949e]"}`}></span>
                <span className="text-[10px] text-[#8b949e]">
                    {tenant?.is_active ? "Active" : "Inactive"}
                </span>
            </div>

            <div className="ml-auto flex items-center gap-2.5">
                {activeNav.name === "Agents" && (
                <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                text-xs font-bold text-white transition-all
                bg-linear-to-r from-[#1c50a0] to-[#58a6ff]
                border border-[rgba(88,166,255,.25)] shadow-[0_4px_14px_rgba(88,166,255,0.2)] cursor-pointer"
                onClick={() => {
                    setShowAgentModal(true)
                }}>
                    <Plus size={15} />
                    Add Agent
                </button>
                )}
                {activeNav.name === "Campaign" && (
                <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                text-xs font-bold text-white transition-all
                bg-linear-to-r from-[#1c50a0] to-[#58a6ff]
                border border-[rgba(88,166,255,.25)] shadow-[0_4px_14px_rgba(88,166,255,0.2)] cursor-pointer"
                onClick={() => setShowCreateModal(true)}>
                    <Plus size={15} />
                    Add Campaign
                </button>
                )}
            </div>
        </div>
    )
}