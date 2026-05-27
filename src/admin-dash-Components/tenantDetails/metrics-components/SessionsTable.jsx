import { formatDistanceToNow } from "date-fns";

export default function SessionsTable({sessions}) {
    return(
        <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#394555]">
                        {["Room Name", "Model", "Provider", "Turns", "Avg TTFT (s)", "Avg Prompt Tokens", "Last Active"].map((item) => (
                            <th className="text-left p-[7px_10px] text-xs font-medium tracking-widest 
                            uppercase text-[#8b949e]">
                                {item}
                            </th>
                        ))}
                    </tr>
                    <tbody>
                        {sessions?.items?.map((session,i) => (
                            <tr
                            key={i}>
                                <td className="p-[7px_10px] text-[16px] font-bold text-white">
                                    {session.room_name}
                                </td>
                                <td className="p-[7px_10px] text-[16px] font-bold text-white"
                                style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                    {session.model_name}
                                </td>
                                <td className="p-[7px_10px] text-[#8b949e] text-xs"
                                style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                    {session.turn_count}
                                </td>
                                <td className="p-[7px_10px] text-[#8b949e] text-xs"
                                style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                    {session.avg_ttft}
                                </td>
                                <td className="p-[7px_10px] text-[#8b949e] text-xs"
                                style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                    {session.avg_prompt_tokens}
                                </td>
                                <td className="p-[7px_10px] text-[#8b949e] text-xs"
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
                </thead>
            </table>
        </div>
    )
}