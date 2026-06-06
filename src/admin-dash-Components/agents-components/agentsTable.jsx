import Pagination from "../shared/pagination"

export default function AgentsTable({agents, loading, setSelectedAgent, selectedAgent, setShowAgentDetails, page, setPage, pageSize, setPageSize, total}) {
    return(
        <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr
                    className="border-b border-[#21262d]">
                        {["Name", "SIP Number", "Type", "Status", "Tools"].map((item) => (
                            <th className="text-left px-5 py-3 text-xs font-medium tracking-widest 
                        uppercase text-[#8b949e]">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-6"
                            >
                                <div className="flex items-center justify-center">
                                    <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                                    viewBox="25 25 50 50">
                                        <circle
                                        className="loading-circle" 
                                        r="20" cy="50" cx="50"></circle>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                        ) : agents.length === 0 ? (
                            <tr>
                                <td
                                colSpan="5"
                                className="text-center py-6 text-[#8b949e]"
                                >
                                    No agents found
                                </td>
                            </tr>
                                ) : (
                                    agents.map((agent) => (
                                        <tr
                                        key={agent.id}
                                        onClick={() => {
                                            if (selectedAgent?.id === agent.id) {
                                                setShowAgentDetails(false);
                                                setSelectedAgent(null);
                                            } else {
                                                setSelectedAgent(agent);
                                                setShowAgentDetails(true);
                                            }
                                        }
                                        }
                                        className={`border-b border-[#21262d] last:border-0 hover:bg-[rgba(255,255,255,.02)] transition-colors cursor-pointer 
                                            ${selectedAgent?.id === agent.id ? 'bg-[rgba(88,166,255,0.12)]' : ''}`}
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                                                    text-white text-[11px] font-bold shrink-0
                                                        ${agent.is_active ? "bg-linear-to-br from-[#1c50a0] to-[#3b6fbf]" 
                                                        : "bg-linear-to-br from-[#64748b] to-[#94a3b8]"}`}
                                                    style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                                            {agent?.name ? agent.name
                                                            .split(" ")
                                                            .map(word => word.charAt(0).toUpperCase())
                                                            .slice(0,2)
                                                            .join("") 
                                                            : ""}
                                                        </div>
                                                    <div className="text-[16px] px-4 py-4 font-bold text-white"
                                                    style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                                        {agent.name}
                                                    </div>
                                                    <div className="px-4 py-4 text-[#8b949e] text-xs mt-0.5"
                                                    style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                                        {agent.id.slice(0,20)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-[#8b949e] text-[16px]"
                                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                                {agent?.sip_number || ''}
                                            </td>
                                            <td className="px-4 py-4 capitalize text-[#8b949e] text-[16px]">
                                                {agent.type}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex justify-center items-center">
                                                    <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                                                        ${agent.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                                        <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                                            ${agent.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#d1d5db]"}`}>
                                                        </span>
                                                        {agent.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="text-[16px] font-semibold text-[#8b949e]"
                                                style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                                    {agent?.tools?.filter(t => t.is_enabled).length}
                                                </span>
                                                <span className="text-sm text-[#9aabca]">
                                                    / {agent?.tools?.length}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
            </table>

            <Pagination 
            page={page} 
            setPage={setPage} 
            pageSize={pageSize} 
            setPageSize={setPageSize} 
            total={total}
            label="agents" />
        </div>
    )
}