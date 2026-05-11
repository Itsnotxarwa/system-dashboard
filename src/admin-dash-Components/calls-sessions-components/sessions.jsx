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
    const [limit, setLimit] = useState(20);

    const token = localStorage.getItem("token");

    const fetchSessions = useCallback(async () => {
        try{
            setLoading(true);

            const params = new URLSearchParams();

            if (tenantId) params.append("tenant_id", tenantId);
            if (agentId) params.append("agent_id", agentId);
            if (type) params.append("type", type);
            params.append("page", page);
            params.append("page_size", limit);

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
    },[token, tenantId, agentId, type, page, limit]);

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
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Sessions
                    </h2>

                    {/* filters */}
                    <div className="flex items-center gap-4 mb-6 flex-wrap">
                        <input type="text"
                        placeholder="Tenant ID"
                        value={tenantId}
                        onChange={(e) => setTenantId(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-65 text-[#0a1628]" />
                        <input type="text"
                        placeholder="Agent ID"
                        value={agentId}
                        onChange={(e) => setAgentId(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-65 text-[#0a1628]" />
                        <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-65 text-[#0a1628] cursor-pointer">
                            <option value="">All types</option>
                            <option value="inbound">inbound</option>
                            <option value="outbound">outbound</option>
                        </select>
                        <div className="flex items-center gap-1.5">
                            <label className="text-sm text-[#0a1628]">
                                Page
                            </label>
                            <input 
                            type="number"
                            value={page}
                            onChange={(e) => setPage(Number(e.target.value))}
                            className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                            w-15 text-[#0a1628] text-center" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <label className="text-sm text-[#0a1628]">
                                limit
                            </label>
                            <input 
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            type="number"
                            className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                            w-15 text-[#0a1628] text-center" />
                        </div>
                    </div>

                    {sessions.length === 0 && !loading && (
                        <div className="text-center text-gray-500 py-10">
                            No sessions found.
                        </div>
                    )}

                    {/* Table */}
                    {sessions.length > 0 && (
                    <div className="overflow-y-auto scroll bg-white rounded-lg shadow-md">
                        <table className="w-full border-collapse text-sm roumded-lg">
                            <thead className="sticky top-0 bg-[#fafafa]">
                                <tr className="border-b border-[rgba(3,44,166,.07)]">
                                    <th className="text-left px-5 py-2.5 text-sm font-medium tracking-widest uppercase text-black">
                                        From
                                    </th>
                                    <th className="text-left px-5 py-2.5 text-sm font-medium tracking-widest uppercase text-black">
                                        To
                                    </th>
                                    <th className="text-left px-5 py-2.5 text-sm font-medium tracking-widest uppercase text-black">
                                        Type
                                    </th>
                                    <th className="text-left px-5 py-2.5 text-sm font-medium tracking-widest uppercase text-black">
                                        Duration
                                    </th>
                                    <th className="text-left px-5 py-2.5 text-sm font-medium tracking-widest uppercase text-black">
                                        Status
                                    </th>
                                    <th className="text-left px-5 py-2.5 text-sm font-medium tracking-widest uppercase text-black">
                                        End Raison
                                    </th>
                                    <th className="text-left px-5 py-2.5 text-sm font-medium tracking-widest uppercase text-black">
                                        Created at
                                    </th>
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
                                        <td colSpan="7" className="text-center py-4 text-slate-800">
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
                                    className={`border-b border-[rgba(3,44,166,.05)] hover:bg-[rgba(3,44,166,.02)] 
                                    cursor-pointer`}>
                                    <td className="px-5 py-2.5 text-sm text-slate-800">
                                        {session.from_number}
                                    </td>
                                    <td className="px-5 py-2.5 text-sm text-slate-800">
                                        {session.to_number}
                                    </td>
                                    <td className="px-5 py-2.5 text-sm text-slate-800 text-center">
                                        <div className="flex justify-center items-center">
                                            <span className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px]
                                            ${session.call_type === "outbound" ? "border text-blue bg-[rgba(3,44,166,.08)] border-[rgba(3,44,166,.20)]" 
                                            : ""}
                                            ${session.call_type === "inbound" ? "border text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.020)]" 
                                            : ""}`}>
                                                {session.call_type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-2.5 text-sm text-slate-800">
                                        {formatDuration(session.duration_seconds)}
                                    </td>
                                    <td className="px-5 py-2.5 text-sm text-slate-800 text-center">
                                        <div className="flex justify-center items-center">
                                            <span className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px] border
                                            ${session.call_status === "ANSWERED" ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" 
                                            : "text-[#dc2626] bg-[rgba(220,38,38,.08)] border-[rgba(220,38,38,.20)]"}`}>
                                            <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                                ${session.call_status === "ANSWERED" ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#f87171] shadow-[0_0_5px_#f87171]"}`}>
                                            </span>
                                            {session.call_status}
                                            </span>
                                        </div>
                                        </td>
                                        <td className="px-5 py-2.5 text-sm text-slate-800">
                                            {session.disconnect_reason}
                                        </td>
                                        <td className="px-5 py-2.5 text-sm text-slate-800">
                                            {formatDate(session.created_at)}
                                        </td>
                                    </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>

    )
}