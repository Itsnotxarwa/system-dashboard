import { Bot, ChevronDown, User } from "lucide-react";
import { useState } from "react";

export default function CallSession({callSessions}) {
    const [openRow, setOpenRow] = useState(null);

    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const toggleRow = (id) => {
        setOpenRow(openRow === id ? null : id)
    }
    
    return(
        <div className=" bg-white rounded-2xl border border-[rgba(3,44,166,.09)]
        shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b
            border-[rgba(3,44,166,.07)] bg-[rgba(3,44,166,.02)]">
                <span className="text-sm font-bold text-slate-800"
                style={{fontFamily:"Cabinet Grotesk',sans-serif"}}>
                    Call Sessions
                </span>
                <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[rgba(3,44,166,.08)] text-[#032ca6]">
                    {callSessions?.length} sessions
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
                        {callSessions?.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-slate-400">
                                    No call sessions found for this call.
                                </td>
                            </tr>
                        ) : (
                        callSessions?.map((session) => {
                            const isOpen = openRow === session.id;
                            let parsedTranscription = [];

                            try {
                                parsedTranscription = session.transcription
                                    ? JSON.parse(session.transcription)
                                    : [];
                                } catch {
                                parsedTranscription = [];
                            }
                            const hasTranscription =
                                session.transcription &&
                                session.transcription !== "null" &&
                                session.transcription !== "[]";

                            return(
                            <>
                            <tr  
                            key={session.id}
                            onClick={() => toggleRow(session.id)}
                            className={`border-b border-[rgba(3,44,166,.05)] hover:bg-[rgba(3,44,166,.02)] 
                            cursor-pointer ${isOpen ? "bg-[rgba(3,44,166,.02)]" : ""}`}>
                                <td className="p-[10px_5px_10px_16px] w-7">
                                    <div className={`h-4.5 w-4.5 rounded-[5px] border shrink-0
                                        ${hasTranscription ? 
                                        "#032ca6 bg-[rgba(3,44,166,.07)] border-[rgba(3,44,166,.14)]" 
                                        : "#d1d5db bg-transparent border-[rgba(3,44,166,.06)]"}
                                        `}>
                                            {hasTranscription && (
                                                <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                            )}
                                        </div>
                                </td>
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
                            {isOpen && (
                                <tr className="bg-[rgba(3,44,166,.02)]">
                                    <td colSpan={7} className="px-5 py-3 text-xs text-slate-600">
                                        {parsedTranscription && parsedTranscription.length > 0 ? (
                                            <div className="space-y-3">
                                            {parsedTranscription.map((item,i) => {
                                                const isAI = item.role === "assistant"
                                                return(
                                                <div
                                                key={i}
                                                className={`flex items-start gap-2 ${
                                                    isAI ? "" : "flex-row-reverse"
                                                    }`}>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white mt-0.5 shrink-0
                                                    ${
                                                        isAI
                                                        ? "bg-linear-to-br from-[#032ca6] to-[#1a6bff]"
                                                        : "bg-linear-to-br from-slate-600 to-slate-400"
                                                    }`}>
                                                        {isAI ? "AI" : "CL"}
                                                    </div>
                                                    <div className={`max-w-[78%] px-3 py-2 text-[11px] leading-relaxed transition-all duration-200 wrap-break-word
                                                    ${
                                                        isAI
                                                        ? "bg-[rgba(3,44,166,.06)] border border-[rgba(3,44,166,.12)] text-[#0a1628] rounded-[4px_14px_14px_14px]"
                                                        : "bg-slate-50 border border-[rgba(100,116,139,.15)] text-slate-700 rounded-[14px_4px_14px_14px]"
                                                    }`}>
                                                        <div className={`text-[8px] font-semibold tracking-wider uppercase mb-1
                                                            ${isAI ? "text-[#032ca6]" : "text-slate-500"}`}>
                                                                {isAI ? 
                                                                <>
                                                                <Bot className="inline w-3 h-3 mr-1" />
                                                                AI agent
                                                                </> 
                                                                : (
                                                                    <>
                                                                        <User className="inline w-3 h-3 mr-1" />
                                                                        Client
                                                                    </>
                                                                )}
                                                        </div>
                                                        <div>
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            )})}
                                            </div>
                                        )
                                        : 
                                        (
                                            <p className="text-center text-[#9aabca] text-xs p-5">
                                                No transcription available for this call.
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            )}
                            </>
                        )}))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}