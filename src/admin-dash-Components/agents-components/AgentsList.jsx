export default function AgentsList({agents, setSelectedAgent, setShowAgentDetails}) {
    
    return (
    <div className="bg-white rounded-2xl overflow-hidden mb-6 border border-[rgba(3,44,166,.09)] 
        shadow-[0_2px_12px_rgba(3,44,166,.06)]">
        {agents.length === 0
        ? (
        <div className="py-6 text-center text-[11px] text-slate-300 rounded-xl
        border-dashed border-[rgba(3,44,166,0.12)]">
            No agents yet — click 
            <strong className="text-blue-700">+ Add Agent</strong> 
            to create one.
        </div>
        )
        :  
        (
            <table className="w-full border-collapse">
                <thead>
                    <tr
                    className="bg-[rgba(3,44,166,0.05)] cursor-pointer">
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Agent Name
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            SIP Number
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            LLM
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            STT
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            TTS
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Status
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Tools
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {agents.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-6 text-sm text-slate-500">
                                No agents for this tenant
                            </td>
                        </tr>
                        ) : (
                        agents.map((a, i) => (
                        <tr 
                        key={i}
                        onClick={() => {
                            setSelectedAgent(a);
                            setShowAgentDetails(true);
                        }} 
                        className="border-t border-[rgba(3,44,166,0.06)] hover:bg-[rgba(3,44,166,.02)]">
                            <td className="p-[13px_20px]">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-8.5 h-8.5 rounded-[10px] flex items-center justify-center
                                    text-white text-[11px] font-extrabold shrink-0
                                        ${a.is_active ? "bg-linear-to-br from-[#032ca6] to-[#1a6bff]" 
                                        : "bg-linear-to-br from-[#64748b] to-[#94a3b8]"}`}>
                                            {a?.name ? a.name
                                            .split(" ")
                                            .map(word => word.charAt(0).toUpperCase())
                                            .slice(0,2)
                                            .join("") 
                                            : ""}
                                        </div>
                                    <div className="text-[13px] font-bold text-[#0a1628]"
                                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                        {a.name}
                                    </div>
                                    <div className="text-[9px] text-[#9aabca] mt-0.5">
                                        {a.id.slice(0,20)}
                                    </div>
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <span className="text-xs text-[#374151]">
                                    {a?.sip_number || ''}
                                </span>
                            </td>
                            <td className="p-[13px_20px]">
                                <div>
                                    <span className="text-xs font-semibold text-[#032ca6]">
                                        {a.models_config?.llm?.provider || ''}
                                    </span>
                                    <div className="text-xs text-[#9aabca] mt-0.5">
                                        {a.models_config?.llm?.model_name || ''}
                                    </div>
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <div>
                                    <span className="text-xs font-semibold text-[#059669]">
                                        {a.models_config?.stt?.provider || ""}
                                    </span>
                                    <div className="text-xs text-[#9aabca] mt-0.5">
                                        {a.models_config?.stt?.model_name || ""} {" "} {a.models_config?.stt?.language || ""}
                                    </div>
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <div>
                                    <span className="text-xs font-semibold text-[#7c3aed]">
                                        {a.models_config?.tts?.provider}
                                    </span>
                                    <div className="text-xs text-[#9aabca] mt-0.5">
                                        {a.models_config?.tts?.model_name} {" "} {a.models_config?.tts?.language}
                                    </div>
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                                    ${a.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                    <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                        ${a.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#d1d5db]"}`}>
                                    </span>
                                    {a.is_active ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="p-[13px_20px]">
                                <span className="text-xs font-semibold text-[#0a1628]"
                                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                    {a?.tools?.filter(t => t.is_enabled).length}
                                </span>
                                <span className="text-[11px] text-[#9aabca]">
                                    / {a?.tools?.length}
                                </span>
                            </td>
                        </tr>
                        )))}
                    </tbody>
                </table>
        )
            }
        </div>
    )
}