import Sidebar from "./sidebar";
import { useState, useEffect, useCallback } from "react";
import { handleUnauthorized } from "../utils/auth";

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);

    // filters
    const [tenantId, setTenantId] = useState("");
    const [type, setType] = useState("");
    const [sipNumber, setSipNumber] = useState("");

    const token = localStorage.getItem("token");

    const fetchAgents = useCallback(async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (tenantId) params.append("tenant_id", tenantId);
            if (type) params.append("type", type);
            if (sipNumber) params.append("sip_number", sipNumber);

            const url = `https://api.voixup.fr/admin/agents?${
                params.toString() ? `?${params.toString()}` : ""
            }`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (response.status === 404) {
                setAgents([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch agents");
            }

            const data = await response.json();
            setAgents(data);
            console.log("agents:", data);
        } catch (error) {
            console.error("Error fetching agents:", error);
            setAgents([]);
        } finally {
            setLoading(false);
        }
    }, [tenantId, type, sipNumber, token]);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);

    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1">
                <div className="max-w-7xl mx-auto p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        Agents 
                    </h2>

                    {/* Filters */}
                    <div className="flex items-center gap-4 mb-6 flex-wrap">
                        <input type="text"
                        placeholder="Tenant ID"
                        value={tenantId}
                        onChange={(e) => setTenantId(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-65 text-[#0a1628]" />
                        <input 
                        type="text" 
                        placeholder="SIP number" 
                        value={sipNumber}
                        onChange={(e) => setSipNumber(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-50 text-[#0a1628]"
                        />
                        <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-65 text-[#0a1628] cursor-pointer">
                            <option value="">All types</option>
                            <option value="active">inbound</option>
                            <option value="inactive">outbound</option>
                        </select>
                    </div>
                    {/* Agents Table */}
                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr
                                className="bg-[rgba(3,44,166,0.05)] cursor-pointer">
                                    <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                                    uppercase text-slate-400">
                                        Name
                                    </th>
                                    <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                                    uppercase text-slate-400">
                                        SIP Number
                                    </th>
                                    <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                                    uppercase text-slate-400">
                                        Type
                                    </th>
                                    <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                                    uppercase text-slate-400">
                                        Status
                                    </th>
                                    <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                                    uppercase text-slate-400">
                                        Tools
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
                                                <svg className="circle-svg" viewBox="25 25 50 50">
                                                    <circle r="20" cy="50" cx="50"></circle>
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                ) : agents.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center py-6 text-slate-500"
                                        >
                                            No agents found
                                        </td>
                                    </tr>
                                ) : (
                                    agents.map((agent) => (
                                        <tr
                                        key={agent.id}
                                        className="border-t border-[rgba(3,44,166,0.06)] hover:bg-[rgba(3,44,166,.02)]
                                        cursor-pointer"
                                        >
                                            <td className="p-[13px_20px]">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-8.5 h-8.5 rounded-[10px] flex items-center justify-center
                                                    text-white text-[11px] font-extrabold shrink-0
                                                        ${agent.is_active ? "bg-linear-to-br from-[#032ca6] to-[#1a6bff]" 
                                                        : "bg-linear-to-br from-[#64748b] to-[#94a3b8]"}`}>
                                                            {agent?.name ? agent.name
                                                            .split(" ")
                                                            .map(word => word.charAt(0).toUpperCase())
                                                            .slice(0,2)
                                                            .join("") 
                                                            : ""}
                                                        </div>
                                                    <div className="text-[13px] font-bold text-[#0a1628]"
                                                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                                        {agent.name}
                                                    </div>
                                                    <div className="text-[11px] text-[#9aabca] mt-0.5">
                                                        {agent.id.slice(0,20)}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-[13px_20px]">
                                                {agent?.sip_number || ''}
                                            </td>

                                            <td className="p-[13px_20px] capitalize">
                                                {agent.type}
                                            </td>

                                            <td className="p-[13px_20px] text-center">
                                                <div className="flex justify-center items-center">
                                                    <span className={`flex items-center gap-1 text-lg font-medium py-1 px-2.5 rounded-[20px] border
                                                        ${agent.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                                        <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                                            ${agent.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#d1d5db]"}`}>
                                                        </span>
                                                        {agent.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-[13px_20px]">
                                                <span className="text-lg font-semibold text-[#0a1628]"
                                                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
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
                    </div>
                </div>
            </main>
        </div>
    )
}