import { formatDistanceToNow } from "date-fns";

export default function SessionsTable({sessions, loading, selectedSession, setSelectedSession, totalSessions, page, setPage, pageSize, setPageSize}) {
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
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden flex-1 min-w-0">
            {/* Head */}
            <div className="px-5 py-4 border-b border-[#21262d] flex items-center gap-2">
                <h1 className="text-lg font-bold text-white"
                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                    Recent Sessions
                </h1>
                {sessions && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium ml-auto font-mono
                    bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.25)]">
                        {sessions.total} Total 
                    </span>
                )}
            </div>

            {/* Body */}
            <table className="w-full border-collapse"
            style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr className="bborder-b border-[#21262d]">
                        {[
                            ["Room Name", "40%"], 
                            ["Total Turns", "15%"], 
                            ["LLM TTFT", "15%"], 
                            ["TTS TFTB", "15%"], 
                            ["Last Active", "15%"]
                        ].map(([h,w]) => (
                            <th 
                            key={h}
                            style={{width: w}}
                            className="text-left p-[7px_10px] text-sm font-medium tracking-widest 
                            uppercase text-[#8b949e]">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sessions?.items?.map((session,i) => (
                        <tr
                        key={i}
                        onClick={() => setSelectedSession(session)}
                        className={`border-b border-[#21262d] last:border-0 hover:bg-[rgba(255,255,255,.02)] transition-colors cursor-pointer ${selectedSession === session ? 'bg-[rgba(88,166,255,0.12)]' : ''}`}
                        >
                            <td className="p-[7px_10px] text-sm font-bold text-[#58a6ff]"
                            style={{fontFamily: "'IBM Plex Mono', monospace"}}>
                                {session.room_name}
                            </td>
                            <td className="p-[7px_10px] text-sm text-[#8b949e] font-bold"
                            style={{fontFamily: "'IBM Plex Mono', monospace"}}>
                                {(session?.tts?.metrics?.turn_count || 0) + (session?.llm?.metrics?.turn_count || 0)}
                            </td>
                            <td className="p-[7px_10px]"
                            style={{fontFamily: "'IBM Plex Mono', monospace"}}>
                                <span className="text-sm font-bold inline-block rounded-sm
                                bg-[rgba(57,211,187,.12)] text-[#39d3bb] p-[2px_7px]">
                                    {session?.llm?.metrics?.avg_ttft || ""}
                                </span>
                            </td>
                            <td className="p-[7px_10px] text-sm"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {session?.tts?.metrics?.avg_ttfb || ""}
                            </td>
                            <td className="p-[7px_10px] text-[#8b949e] text-sm"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {session.last_active && !isNaN(session.last_active)
                                ? formatDistanceToNow(new Date(Number(session.last_active) * 1000), {
                                    addSuffix: true,
                                })
                                : ""}                                         
                            </td>
                        </tr>
                    ))}
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