import { useState, useCallback, useEffect } from "react";
import {handleUnauthorized} from "../../utils/auth";

export default function Sessions({setSelectedSession, setOpenSessionDrawer }) {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    //filters
    const [tenantId, setTenantId] = useState("");
    const [agentId, setAgentId] = useState("");
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const token = localStorage.getItem("token");

    const fetchSessions = useCallback(async () => {
        try{
            setLoading(true);

            const params = new URLSearchParams();

            if (tenantId) params.append("tenant_id", tenantId);
            if (agentId) params.append("agent_id", agentId);
            if (type) params.append("type", type);
            params.append("page", page);
            params.append("page_size", pageSize);

            const url = `https://api.voixup.fr/admin/tenants/calls/sessions?${params.toString()}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }
            
            if (response.status === 404) {
                setSessions([]);
                return;
            }
            
            if (!response.ok) {
                throw new Error("Failed to fetch sessions");
            }
            
            const data = await response.json();
            setSessions(data || []);
        } catch (error) {
            console.error("Error fetching sessions:", error);
            setSessions([]);
        } finally {
            setLoading(false);
        }
    },[token, tenantId, agentId, type, page, pageSize]);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const formatDuration = (duration) => {
        const min = Math.floor(duration / 60);
        const sec = duration % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const formatDate = (datetime) => datetime.split("T")[0];

    return (
                <div className="py-6">
                    <h2 className="text-2xl font-bold text-[#8b949e] mb-4"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Sessions
                    </h2>

                    {/* Filters */}
                    <div className="flex items-center gap-3 py-6 flex-wrap">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input
                            type="text"
                            placeholder="Tenant ID"
                            value={tenantId}
                            onChange={(e) => setTenantId(e.target.value)}
                            className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            font-mono text-[12.5px] rounded-md pl-9 pr-3 py-2 w-64
                            focus:outline-none focus:border-[#58a6ff] transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input
                            type="text"
                            placeholder="Agent ID"
                            value={agentId}
                            onChange={(e) => setAgentId(e.target.value)}
                            className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            font-mono text-[12.5px] rounded-md pl-9 pr-3 py-2 w-64
                            focus:outline-none focus:border-[#58a6ff] transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                            </svg>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="bg-[#161b22] border border-[#30363d] text-[#e6edf3]
                                font-mono text-[12.5px] rounded-md pl-9 pr-8 py-2 w-44
                                focus:outline-none focus:border-[#58a6ff] transition-colors cursor-pointer appearance-none"
                            >
                                <option value="">All types</option>
                                <option value="inbound">inbound</option>
                                <option value="outbound">outbound</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </div>
                    </div>

                    {sessions.length === 0 && !loading && (
                        <div className="text-center text-gray-500 py-10">
                            No sessions found.
                        </div>
                    )}

                    <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
                    {/* Table */}
                        {sessions.length > 0 && (
                            <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-[#21262d]">
                                    {["From", "to", "type", "Duration", "Status", "End Raison", "Created at"].map((item) => (
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
                                ) : sessions.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-[#8b949e]">
                                            No call sessions found for this call.
                                        </td>
                                    </tr>
                                ) : (
                                    sessions?.map((session) => (
                                    <tr  
                                    key={session.id}
                                    onClick={() => {
                                        setSelectedSession(session);
                                        setOpenSessionDrawer(true);
                                    }}
                                    className="hover:bg-[rgba(255,255,255,.03)] border-b border-[#21262d] cursor-pointer transition-colors">
                                    <td className="px-4 py-4 text-[16px] text-[#8b949e]"
                                    style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                        {session.from_number}
                                    </td>
                                    <td className="px-4 py-4 text-[16px] text-[#8b949e]"
                                    style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                        {session.to_number}
                                    </td>
                                    <td className="px-4 py-4 text-[16px] text-[#8b949e] text-center">
                                        <div className="flex justify-center items-center">
                                            <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px]
                                            ${session.call_type === "outbound" ? "border text-blue bg-[rgba(3,44,166,.08)] border-[rgba(3,44,166,.20)]" 
                                            : ""}
                                            ${session.call_type === "inbound" ? "border text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.020)]" 
                                            : ""}`}>
                                                {session.call_type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-[16px] text-[#8b949e]"
                                    style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                        {formatDuration(session.duration_seconds)}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-[#8b949e] text-center">
                                        <div className="flex justify-center items-center">
                                            <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                                            ${session.call_status === "ANSWERED" ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" 
                                            : "text-[#dc2626] bg-[rgba(220,38,38,.08)] border-[rgba(220,38,38,.20)]"}`}>
                                            <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                                ${session.call_status === "ANSWERED" ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#f87171] shadow-[0_0_5px_#f87171]"}`}>
                                            </span>
                                            {session.call_status}
                                            </span>
                                        </div>
                                        </td>
                                        <td className="px-4 py-4 text-[16px] text-[#8b949e]">
                                            {session.disconnect_reason}
                                        </td>
                                        <td className="px-4 py-4 text-[16px] text-[#8b949e]"
                                        style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                            {formatDate(session.created_at)}
                                        </td>
                                    </tr>
                                    )
                                ))}
                            </tbody>
                            </table>
                        )}

                    </div>
                </div>

    )
}