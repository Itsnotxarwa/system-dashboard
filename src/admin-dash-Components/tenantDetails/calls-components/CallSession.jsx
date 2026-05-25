import { Bot, User } from "lucide-react";
import { useState } from "react";

export default function CallSession({callSessions, setSelectedSession, setOpenDrawer, onChange}) {

    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        if (!seconds && seconds !== 0) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const handleChange = (newPage, newLimit) => {
        setPage(newPage);
        setLimit(newLimit);
        onChange?.(newPage, newLimit); 
    };

    return(
        <div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-lg font-bold flex items-center gap-2"
                style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                    Call Sessions
                    <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-[rgba(3,44,166,.08)] text-[#032ca6]">
                        {callSessions?.length} sessions
                    </span>
                </ span>

                {callSessions?.length > 0 && (
            <div className="ml-2 flex items-end p-4 justify-end gap-2">
            {/* Page */}
            <div className="flex items-center gap-1.5">
                <label className="text-xs text-[#9aabca]">Page</label>
                <input
                    type="number"
                    min="1"
                    value={page}
                    onChange={(e) =>
                    handleChange(Number(e.target.value), limit)
                    }
                    className="w-15 px-2 py-1 text-xs text-center rounded-lg border
                    border-[rgba(3,44,166,.14)] outline-none
                    focus:ring-2 focus:ring-[#032ca6]"
                />
            </div>
            {/* Limit */}
            <div className="flex items-center gap-1.5">
                <label className="text-xs text-[#9aabca]">Limit</label>
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={limit}
                    onChange={(e) =>
                    handleChange(page, Number(e.target.value))
                    }
                    className="w-15 px-2 py-1 text-xs text-center rounded-lg border
                    border-[rgba(3,44,166,.14)] outline-none
                    focus:ring-2 focus:ring-[#032ca6]"
                />
            </div>
            </div>
            )}
            </div>


            {/* Table */}
            <div className="bg-[#0d1117] border border-[#21262d] rounded-xl overflow-hidden">
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
                        {callSessions?.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-[#8b949e]">
                                    No call sessions found for this call.
                                </td>
                            </tr>
                        ) : (
                        callSessions?.map((session) => {
                            return(
                            <tr  
                            key={session.id}
                            onClick={() => {
                                setSelectedSession(session);
                                setOpenDrawer(true);
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
                                <td className="px-4 py-4 text-[16px] text-[#8b949e] text-center">
                                    <div className="flex justify-center items-center">
                                        <span className={`flex items-center gap-1 text-[16px] font-medium py-1 px-2.5 rounded-[20px] border
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
                        )}))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}