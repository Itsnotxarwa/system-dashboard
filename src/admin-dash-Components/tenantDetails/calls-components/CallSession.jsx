import { Bot, User } from "lucide-react";

export default function CallSession({callSessions, page, setPage, pageSize, setPageSize, setSelectedSession, setOpenDrawer, loading}) {

    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        if (!seconds && seconds !== 0) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const totalSessions = callSessions?.length || 0;

    const totalPages = Math.ceil(totalSessions / pageSize);
    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalSessions);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                viewBox="25 25 50 50">
                    <circle
                    className="loading-circle" 
                    r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        )
    }

    return(
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden flex-1 min-w-0 overflow-x-auto">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#21262d] flex items-center gap-2">
                <h1 className="text-lg font-bold text-white"
                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                    Call Sessions
                </h1>
                {callSessions && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium ml-auto font-mono
                    bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.25)]">
                        {callSessions?.length} sessions 
                    </span>
                )}
            </div>


            {/* Table */}
            <table className="w-full border-collapse"
            style={{ tableLayout: "fixed" }}>
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
                            className={`border-b border-[#21262d] last:border-0 hover:bg-[rgba(255,255,255,.02)] transition-colors cursor-pointer`}>
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
                                        <span className={`flex items-center gap-2 text-sm font-medium py-1 px-2.5 rounded-[20px] border
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

            {/* Sessions pagination */}
            <div className="flex items-center justify-between mt-4 px-4 py-3
            bg-[#161b22] border-t border-[#21262d] rounded-xl">

                <p className="text-sm text-[#8b949e]">
                    Showing <span className="text-white font-medium"> {" "} {startItem}-{endItem} {" "}</span> of{" "}
                    <span className="text-white font-medium">{totalSessions}</span> sessions
                </p>
                
                <div className="flex items-center gap-3">
                    <button 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="w-7 h-7 grid place-items-center rounded-[5px] border border-[#30363d] text-[#8b949e] bg-transparent
                    hover:bg-[#21262d] hover:text-[#e6edf3] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {pages.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-7 h-7 grid place-items-center rounded-[5px]
                            border transition-all duration-300 cursor-pointer
                            ${page === p
                                ? "bg-[#58a6ff] text-black border-[#58a6ff]"
                                : "border-[#30363d] text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button 
                    className="w-7 h-7 grid place-items-center rounded-[5px] border border-[#30363d] text-[#8b949e] bg-transparent
                    hover:bg-[#21262d] hover:text-[#e6edf3] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}>
                        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>

                <select
                    value={pageSize}
                    onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1); 
                    }}
                    className="bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 text-sm text-white"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    )
}