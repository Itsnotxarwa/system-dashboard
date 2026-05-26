export default function CallSummary({calls}) {
    if (!calls) return null;

    const summary = [
        {
            title: "Answered",
            value: calls.call_status.answered,
            rate: calls.rates.answer_rate,
            background: "#3fb950",
            track: "rgba(63,185,80,.12)",
        },
        {
            title: "Voicemail",
            value: calls.call_status.voicemail,
            rate: calls.rates.voicemail_rate,
            background: "#d29922",
            track: "rgba(210,153,34,.12)",
        },
        {
            title: "Failed",
            value: calls.call_status.failed,
            rate: calls.rates.failed_rate,
            background: "#f85149",
            track: "rgba(248,81,73,.12)",
        }
    ]

    const type = [
        {
            title: "Outbound",
            value: calls.call_type.outbound,
            text: "text-[#58a6ff]",
            background: "bg-[rgba(88,166,255,.08)]",
            border: "border-[rgba(88,166,255,.2)]"
        },
        {
            title: "Inbound",
            value: calls.call_type.inbound,
            text: "text-[#3fb950]",
            background: "bg-[rgba(63,185,80,.08)]",
            border: "border-[rgba(63,185,80,.2)]"
        }
    ]

    const termination = [
        {
            title: "Agent",
            value: calls.termination.agent_ended,
            text: "text-[#bc8cff]",
            background: "bg-[rgba(188,140,255,.08)]",
            border: "border-[rgba(188,140,255,.2)]"
        },
        {
            title: "Human",
            value: calls.termination.human_ended,
            text: "text-[#8b949e]",
            background: "bg-[#0d1117]",
            border: "border-[#21262d]"
        }
    ]

    return(
        <div className="bg-[#161b22] rounded-2xl p-5 border border-[#21262d] shadow-[0_2px_8px_rgba(0,0,0,.3)]">

            <div className="text-sm font-semibold text-[#e6edf3] mb-4 font-mono uppercase tracking-widest">
                Call Summary
            </div>

            <div className="space-y-3">
                {summary.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5 font-mono">
                            <span className="text-[#8b949e]">
                                {item.title}
                            </span>
                            <span className="font-semibold text-[#e6edf3]">
                                {item.value}
                                <span className="text-[#8b949e] font-normal">
                                    {" ("}{item.rate}%{")"}
                                </span>
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{background: item.track}}>
                            <div className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${item.rate}%`,
                                background: item.background,
                                boxShadow: `0 0 8px ${item.background}60`
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-4 h-px bg-[#21262d]" />

            {/* Call Type */}
            <div className="text-[10px] font-mono font-semibold text-[#8b949e] uppercase tracking-widest mb-3">
                Type
            </div>

            <div className="flex gap-2">
                {type.map((item, i) => (
                    <div
                    key={i}
                    className={`flex-1 text-center py-2.5 rounded-xl ${item.background} border ${item.border}`}>
                        <div className={`text-base font-semibold font-mono ${item.text}`}>
                            {item.value}
                        </div>
                        <div className="text-[11px] text-[#8b949e] mt-0.5 font-mono">
                            {item.title} calls
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-4 h-px bg-[#21262d]" />

            {/* Call Termination */}
            <div className="text-[10px] font-mono font-semibold text-[#8b949e] uppercase tracking-widest mb-3">
                Ended by
            </div>

            <div className="flex gap-2">
                {termination.map((item, i) => (
                    <div
                    key={i}
                    className={`flex-1 text-center py-2.5 rounded-xl ${item.background} border ${item.border}`}>
                        <div className={`text-base font-semibold font-mono ${item.text}`}>
                            {item.value}
                        </div>
                        <div className="text-[11px] text-[#8b949e] mt-0.5 font-mono">
                            {item.title} calls
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}