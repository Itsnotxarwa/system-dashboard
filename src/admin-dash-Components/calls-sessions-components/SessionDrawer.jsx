import { Phone, X, Clock, Wifi, Bot, Calendar, User, ArrowUpRight } from "lucide-react";

export default function SessionDrawer({selectedSession, onClose, open}) {
    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        if (!seconds && seconds !== 0) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    let parsedTranscription = [];

    try {
        parsedTranscription = selectedSession?.transcription
            ? JSON.parse(selectedSession.transcription)
            : [];
    } catch {
        parsedTranscription = [];
    }
    
    const hasType = selectedSession?.call_type && selectedSession?.call_type !== "None";
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm p-5">
    <div className={`flex-col fixed top-0 right-0 h-full z-50 bg-[#161b22] border-l scroll overflow-y-auto w-120 shrink-0 border-[#21262d]
    shadow-[-4px_0_24px_rgba(0,0,0,.4)] ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 border-b border-[#21262d] bg-[#161b22]">
            <div className="w-9 h-9 rounded-[11px] flex items-center justify-center text-white shrink-0"
            style={{background:"linear-gradient(135deg,#1c50a0,#58a6ff)"}}>
                <Phone size={16} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#e6edf3] text-sm tracking-tight">
                    Session Details
                </div>
                <div className="text-[11px] text-[#8b949e] truncate font-mono">
                    {selectedSession?.id || ""}
                </div>
            </div>
            <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8b949e]
            hover:text-[#e6edf3] shrink-0 transition-all border border-[#30363d] hover:border-[#58a6ff]">
                <X size={15} />
            </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
                <span className={`text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border font-mono
                ${selectedSession.call_status === "ANSWERED"
                    ? "text-[#3fb950] bg-[rgba(63,185,80,.1)] border-[rgba(63,185,80,.25)]"
                    : "text-[#f85149] bg-[rgba(248,81,73,.1)] border-[rgba(248,81,73,.25)]"}`}>
                    <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                        ${selectedSession.call_status === "ANSWERED"
                            ? "bg-[#3fb950] shadow-[0_0_5px_#3fb950]"
                            : "bg-[#f85149] shadow-[0_0_5px_#f85149]"}`} />
                    {selectedSession?.call_status}
                </span>
                {hasType && (
                    <span className={`text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5 border font-mono
                        ${selectedSession.call_type === "outbound"
                            ? "text-[#58a6ff] bg-[rgba(88,166,255,.1)] border-[rgba(88,166,255,.25)]"
                            : "text-[#3fb950] bg-[rgba(63,185,80,.1)] border-[rgba(63,185,80,.25)]"}`}>
                        <ArrowUpRight size={12} />
                        {selectedSession?.call_type}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]">
                    <div className="flex items-center gap-1 text-[9px] text-[#8b949e] uppercase tracking-widest mb-1 font-mono">
                        <Phone size={11} className="text-[#58a6ff]" />
                        De
                    </div>
                    <div className="text-xs font-semibold text-[#e6edf3] font-mono break-all">
                        {selectedSession?.from_number || ""}
                    </div>
                </div>

                <div className="p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]">
                    <div className="flex items-center gap-1 text-[9px] text-[#8b949e] uppercase tracking-widest mb-1 font-mono">
                        <Phone size={11} className="text-[#58a6ff]" />
                        Vers
                    </div>
                    <div className="text-xs font-semibold text-[#e6edf3] font-mono break-all">
                        {selectedSession?.to_number || ""}
                    </div>
                </div>

                <div className="p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]">
                    <div className="flex items-center gap-1 text-[9px] text-[#8b949e] uppercase tracking-widest mb-1 font-mono">
                        <Clock size={11} className="text-[#58a6ff]" />
                        Durée
                    </div>
                    <div className="text-xs font-semibold text-[#e6edf3] font-mono">
                        {formatDuration(selectedSession?.duration_seconds || "")}
                    </div>
                </div>

                <div className="p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]">
                    <div className="flex items-center gap-1 text-[9px] text-[#8b949e] uppercase tracking-widest mb-1 font-mono">
                        <Wifi size={11} className="text-[#58a6ff]" />
                        Raison fin
                    </div>
                    <div className="text-xs font-semibold text-[#e6edf3] font-mono">
                        {selectedSession?.disconnect_reason || ""}
                    </div>
                </div>

                <div className="p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d] col-span-2">
                    <div className="flex items-center gap-1 text-[9px] text-[#8b949e] uppercase tracking-widest mb-1 font-mono">
                        <Calendar size={11} className="text-[#58a6ff]" />
                        Créé le
                    </div>
                    <div className="text-xs font-semibold text-[#e6edf3] font-mono break-all">
                        {formatDate(selectedSession.created_at)}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#21262d]" />
                <span className="text-[10px] uppercase tracking-widest text-[#8b949e] font-mono">
                    Transcription
                </span>
                <div className="flex-1 h-px bg-[#21262d]" />
            </div>

            {parsedTranscription.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#0d1117] text-[#8b949e] border border-[#21262d] font-mono">
                        {parsedTranscription.length} messages
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-md bg-[rgba(88,166,255,.08)] text-[#58a6ff] border border-[rgba(88,166,255,.2)] font-mono flex items-center gap-1">
                        <Bot size={11} />
                        {parsedTranscription.filter(m => m.role === "assistant").length} AI
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#0d1117] text-[#8b949e] border border-[#21262d] font-mono flex items-center gap-1">
                        <User size={11} />
                        {parsedTranscription.filter(m => m.role === "user").length} client
                    </span>
                </div>
            )}

            {parsedTranscription && parsedTranscription.length > 0 ? (
                <div className="flex flex-col gap-3 pb-3">
                    {parsedTranscription.map((msg, i) => {
                        const isAI = msg.role === "assistant";
                        return (
                            <div key={i} className={`flex gap-2 ${isAI ? "" : "flex-row-reverse"}`}>
                                <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-white mt-1 shrink-0"
                                style={{
                                    background: isAI
                                    ? "linear-gradient(135deg,#1c50a0,#58a6ff)"
                                    : "linear-gradient(135deg,#21262d,#30363d)",
                                }}>
                                    {isAI ? <Bot size={12} /> : <User size={12} />}
                                </div>
                                <div className={`max-w-[80%] text-xs p-3 border ${
                                    isAI
                                        ? "bg-[rgba(88,166,255,.06)] border-[rgba(88,166,255,.15)] text-[#e6edf3] rounded-tl-sm rounded-2xl"
                                        : "bg-[#0d1117] border-[#21262d] text-[#c9d1d9] rounded-tr-sm rounded-2xl"
                                    }`}>
                                    <div className="text-[10px] uppercase font-semibold mb-1.5 flex items-center gap-1 font-mono text-[#8b949e]">
                                        {isAI
                                            ? <><Bot size={10} className="text-[#58a6ff]" /> AI Agent</>
                                            : <><User size={10} /> Client</>
                                        }
                                    </div>
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-sm text-[#8b949e] font-mono py-10">
                    No transcription available for this call.
                </div>
            )}
        </div>
    </div>
</div>
    )
}