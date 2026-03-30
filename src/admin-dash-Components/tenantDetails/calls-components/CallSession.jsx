export default function CallSessions({CallSession}) {
    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };
    
    return(
        <div className="col-span-3 bg-white rounded-2xl border border-[rgba(3,44,166,.09)]
        shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b
            border-[rgba(3,44,166,.07)] bg-[rgba(3,44,166,.02)]">
                <span className="text-sm font-bold text-slate-800"
                style={{fontFamily:"Cabinet Grotesk',sans-serif"}}>
                    Call Sessions
                </span>
                <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[rgba(3,44,166,.08)] text-[#032ca6]">
                    {CallSession?.length} sessions
                </span>
            </div>

            {/* Table */}
            <div className="overflow-y-auto scroll max-h-96">
                <table className="w-full border-collapse text-xs">
                    <thead className="sticky top-0 bg-[#fafafa]">
                        <tr className="border-b border-[rgba(3,44,166,.07)]">
                            <th className="text-left px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                From
                            </th>
                            <th className="text-left px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                To
                            </th>
                            <th className="text-left px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                Type
                            </th>
                            <th className="text-left px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                Duration
                            </th>
                            <th className="text-left px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                Status
                            </th>
                            <th className="text-left px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                End Raison
                            </th>
                            <th className="text-left px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                                Created at
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {CallSession?.map((session) => (
                            <tr key={session.id} className="border-b border-[rgba(3,44,166,.05)] hover:bg-[rgba(3,44,166,.02)] cursor-pointer">
                                <td className="px-5 py-2.5 text-[10px] text-slate-400">
                                    {session.from_number}
                                </td>
                                <td className="px-5 py-2.5 text-[10px] text-slate-400">
                                    {session.to_number}
                                </td>
                                <td className="px-5 py-2.5 text-[10px] text-slate-400">
                                    {session.call_type}
                                </td>
                                <td className="px-5 py-2.5 text-[10px] text-slate-400">
                                    {formatDuration(session.duration_seconds)}
                                </td>
                                <td className="px-5 py-2.5 text-[10px] text-slate-400">
                                    {session.call_status}
                                </td>
                                <td className="px-5 py-2.5 text-[10px] text-slate-400">
                                    {session.disconnect_reason}
                                </td>
                                <td className="px-5 py-2.5 text-[10px] text-slate-400">
                                    {formatDate(session.created_at)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}