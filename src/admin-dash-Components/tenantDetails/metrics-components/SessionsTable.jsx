import { formatDistanceToNow } from "date-fns";
import Pagination from "../../shared/pagination";

export default function SessionsTable({sessions, loading, selectedSession, setSelectedSession, total, page, setPage, pageSize, setPageSize}) {


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
            {/* Head */}
            <div className="px-5 py-4 border-b border-[#21262d] flex items-center gap-2">
                <h1 className="text-lg font-bold text-white"
                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                    Recent Sessions
                </h1>
                {sessions && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium ml-auto font-mono
                    bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.25)]">
                        {total} Total 
                    </span>
                )}
            </div>

            {/* Body */}
            <table className="w-full border-collapse"
            style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr className="border-b border-[#21262d]">
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
                            <td className="p-[7px_10px] text-sm font-bold text-[#58a6ff] wrap-break-word"
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
            <Pagination
            total={total}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize} />
        </div>
    )
}