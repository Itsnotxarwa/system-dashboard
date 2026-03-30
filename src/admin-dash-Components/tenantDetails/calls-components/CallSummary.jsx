export default function CallSummary({calls}) {
    if (!calls) return null;
    
    const summary = [
        {
            title: "Answered",
            value: calls.call_status.answered,
            rate: calls.rates.answer_rate,
            background: "#032ca6",
        },
        {
            title: "Voicemail",
            value: calls.call_status.voicemail,
            rate: calls.rates.voicemail_rate,
            background: "#d97706",
        },
        {
            title: "Failed",
            value: calls.call_status.failed,
            rate: calls.rates.failed_rate,
            background: "#ef4444",
        }
    ]

    const type = [
        {
            title: "Outbound",
            value: calls.call_type.outbound,
            text: "#032ca6",
            background: "background:rgba(3,44,166,.06)",
            border: "rgba(3,44,166,.14)"
        },
        {
            title: "Inbound",
            value: calls.call_type.inbound,
            text: "#059669",
            background: "background:rgba(5,150,105,.06)",
            border: "rgba(5,150,105,.14)"
        }
    ]

    const termination = [
        {
            title: "Agent",
            value: calls.termination.agent_ended,
            text: "#7c3aed",
            background: "rgba(124,58,237,.06)",
            border: "rgba(124,58,237,.14)"
        },
        {
            title: "Human",
            value: calls.termination.human_ended,
            text: "#475569",
            background: "gba(3,44,166,.04)",
            border: "rgba(3,44,166,.10)"
        }
    ]
    return(
        <div className="bg-white rounded-2xl p-5 border border-[rgba(3,44,166,.09)]
        shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,.04)]">

            <div className="text-sm font-bold text-slate-800 mb-4"
            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                Call Summary
            </div>

            <div className="space-y-3">
                {summary.map((item, i) => (
                <div
                key={i}>
                    <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-500">
                            {item.title}
                        </span>
                        <span className="font-semibold text-slate-700">
                            {item.value}
                            <span className="text-slate-400 font-normal">
                                {"("} {item.rate} % {")"}
                            </span>
                        </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[rgba(3,44,166,0.08)]">
                        <div className="h-full rounded-full"
                        style={{
                            width: `${item.rate}%`,
                            background: `${item.background}`,
                            }} />
                    </div>
                </div>
                ))}
            </div>

            <div class="border-t my-4" style="border-color:rgba(3,44,166,.07)"></div>
            
            {/* Call Type */}
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3">
                Type
            </div>

            <div className="flex gap-2">
                {type.map((item, i) => (
                <div 
                key={i}
                className={`flex-1 text-center py-2.5 rounded-xl ${item.background} border
                ${item.border}`}>
                    <div className="text-base font-black text-[#032ca6]"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        {item.value}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                        {item.title} calls
                    </div>
                </div>
                ))}
            </div>
            
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3">
                Ended by
            </div>

            <div className="flex gap-2">
                {termination.map((item, i) => (
                <div 
                key={i}
                className={`flex-1 text-center py-2.5 rounded-xl ${item.background} border
                ${item.border}`}>
                    <div className="text-base font-black text-[#032ca6]"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        {item.value}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                        {item.title} calls
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}