import { formatDistanceToNow } from "date-fns";

export default function SessionsTable({sessions, loading}) {
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
        <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#394555]">
                        {["Room Name", "Total Turns", "LLM TTFT", "TTS TFTB", "Last Active"].map((item) => (
                            <th className="text-left p-[7px_10px] text-sm font-medium tracking-widest 
                            uppercase text-[#8b949e]">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sessions?.items?.map((session,i) => (
                        <tr
                        key={i}>
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
        </div>
    )
}