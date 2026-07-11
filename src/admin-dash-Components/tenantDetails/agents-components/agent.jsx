import { useState, useEffect } from "react";
import apiFetch from "../../shared/ApiFetch";
import { useParams } from "react-router-dom";
import TenantSidebar from "../tenantSidebar";

export default function Agent() {
    const { id, agentId } = useParams();

    const [agent, setAgent] = useState(null);

    useEffect(() => {
        const fetchAgent = async () => {
            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}/agents/${agentId}`);
            if (!res) return;

            const data = await res.json();
            setAgent(data);
        };

        fetchAgent();
    }, [id, agentId]);

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-55">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center 
                    justify-center text-white text-sm font-black shrink-0 
                    bg-linear-to-br from-[#1c50a0] to-[#58a6ff] 
                    shadow-[0_6px_18px_rgba(3,44,166,.22)]">
                        {agent?.name ? agent.name
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0,2)
                        .join("") 
                        : ""}
                    </div>
                    
                    <div className="flex-1">
                        {/* Name + Status */}
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-white tracking-tight" 
                            style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                                {agent?.name || ""}
                            </h1>
                            <div className="flex items-center justify-center gap-1.5 ml-2">
                                <span className={`w-1.5 h-1.5 rounded-full
                                    ${agent?.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#6b7280] shadow-[0_0_5px_#6b7280]"}`}></span>
                                <span className="text-[10px] text-slate-400">
                                    {agent?.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        {/* Id */}
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-slate-400 font-mono">
                                {agent?.id}
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}