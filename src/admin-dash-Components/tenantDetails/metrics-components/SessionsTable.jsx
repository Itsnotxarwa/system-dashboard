import { formatDistanceToNow } from "date-fns";

export default function SessionsTable({sessions}) {
    return(
        <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#394555]">
                        {["Room Name", "Model", "Provider", "Turns", "Avg TTFT (s)", "Avg Prompt Tokens", "Last Active"].map((item) => (
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
                                {session.model_name}
                            </td>
                            <td className="p-[7px_10px]"
                            style={{fontFamily: "'IBM Plex Mono', monospace"}}>
                                <span className="text-sm font-bold inline-block rounded-sm
                                bg-[rgba(57,211,187,.12)] text-[#39d3bb]">
                                    {session.model_provider}
                                </span>
                            </td>
                            <td className="p-[7px_10px] text-sm"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {session.turn_count}
                            </td>
                            <td className="p-[7px_10px] text-sm"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {session.avg_ttft}
                            </td>
                            <td className="p-[7px_10px] text-sm"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {session.avg_prompt_tokens}
                            </td>
                            <td className="p-[7px_10px] text-[#8b949e] text-sm"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {session.last_active && !isNaN(session.last_active)
                                ? formatDistanceToNow(new Date(Number(session.last_active) * 1000), {
                                    addSuffix: true,
                                })
                                : "—"}                                         
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}