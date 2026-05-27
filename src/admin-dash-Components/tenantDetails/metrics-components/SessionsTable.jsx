import { formatDistanceToNow } from "date-fns";

export default function SessionsTable({sessions}) {
    return(
        <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#394555]">
                        {["Room Name", "Model", "Provider", "Turns", "Avg TTFT (s)", "Avg Prompt Tokens", "Avg TPS", "Last Active"].map((item) => (
                            <th className="text-left p-[7px_10px] text-xs font-medium tracking-widest 
                            uppercase text-[#8b949e]">
                                {item}
                            </th>
                        ))}
                    </tr>
                    <tbody>
                        {sessions.map((session,i) => (
                            <tr
                            key={i}>
                                <td>
                                    {session.items.room_name}
                                </td>
                                <td>
                                    {session.items.model_name}
                                </td>
                                <td>
                                    {session.items.turn_count}
                                </td>
                                <td>
                                    {session.items.avg_ttft}
                                </td>
                                <td>
                                    {session.items.avg_prompt_tokens}
                                </td>
                                <td>
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