import { Bot, User } from "lucide-react";

export default function CallSession({callSessions, setSelectedSession, setOpenDrawer}) {

    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        if (!seconds && seconds !== 0) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    return(
        <div className=" bg-white rounded-2xl border border-[rgba(3,44,166,.09)]
        shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b
            border-[rgba(3,44,166,.07)] bg-[rgba(3,44,166,.02)]">
                <span className="text-lg font-bold text-black"
                style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                    Call Sessions
                </span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[rgba(3,44,166,.08)] text-[#032ca6]">
                    {callSessions?.length} sessions
                </span>
            </div>

            {/* Table */}
            <div className="overflow-y-auto scroll max-h-96">
                <table className="w-full border-collapse text-xs">
                    <thead className="sticky top-0 bg-[#fafafa]">
                        <tr className="border-b border-[rgba(3,44,166,.07)]">
                            <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black">
                                From
                            </th>
                            <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black">
                                To
                            </th>
                            <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black">
                                Type
                            </th>
                            <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black">
                                Duration
                            </th>
                            <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black">
                                Status
                            </th>
                            <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black">
                                End Raison
                            </th>
                            <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black">
                                Created at
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {callSessions?.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-slate-800">
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
                            className={`border-b border-[rgba(3,44,166,.05)] hover:bg-[rgba(3,44,166,.02)] 
                            cursor-pointer`}>
                                <td className="px-5 py-2.5 text-xs text-slate-800">
                                    {session.from_number}
                                </td>
                                <td className="px-5 py-2.5 text-xs text-slate-800">
                                    {session.to_number}
                                </td>
                                <td className="px-5 py-2.5 text-xs text-slate-800 text-center">
                                    <div className="flex justify-center items-center">
                                        <span className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px] border
                                        ${session.call_type === "outbound" ? "text-blue bg-[rgba(3,44,166,.08)] border-[rgba(3,44,166,.20)]" 
                                        : ""}
                                        ${session.call_type === "inbound" ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.020)]" 
                                        : ""}`}>
                                            {session.call_type}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-2.5 text-xs text-slate-800">
                                    {formatDuration(session.duration_seconds)}
                                </td>
                                <td className="px-5 py-2.5 text-xs text-slate-800 text-center">
                                    <div className="flex justify-center items-center">
                                        <span className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px] border
                                        ${session.call_status === "ANSWERED" ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" 
                                        : "text-[#dc2626] bg-[rgba(220,38,38,.08)] border-[rgba(220,38,38,.20)]"}`}>
                                        <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                            ${session.call_status === "ANSWERED" ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#f87171] shadow-[0_0_5px_#f87171]"}`}>
                                        </span>
                                        {session.call_status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-2.5 text-xs text-slate-800">
                                    {session.disconnect_reason}
                                </td>
                                <td className="px-5 py-2.5 text-xs text-slate-800">
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