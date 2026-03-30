export default function TopCallers({calls}) {
    const topCallers = [
        {
            id: 1,
            number: calls.top_callers[0].from_number,
            callCount: calls.topCallers[0].call_count,
            background: "#032ca6",
        },
        {
            id: 2,
            number: calls.top_callers[1].from_number,
            callCount: calls.topCallers[1].call_count,
            background: "#7c3aed",
        },
        {
            id: 3, 
            number: calls.top_callers[2].from_number,
            callCount: calls.topCallers[2].call_count,
            background: "#059669",
        },
        {
            id: 4,
            number: calls.top_callers[3].from_number,
            callCount: calls.topCallers[3].call_count,
            background: "#d97706",
        }
    ]

    return(
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 border border-[rgba(3,44,166,.09)]
            shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,.04)]">
                <div className="text-sm font-bold text-slate-800 mb-4"
                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                    Top Callers
                </div>
                <div className="space-y-2.5">
                    {topCallers.map((caller, i) => {
                        return (
                        <div key={i} className="flex items-center gap-3">
                            {/* Rank circle */}
                            <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                            style={{ background: caller.background }}
                            >
                                {i + 1}
                            </div>

                            {/* Number + bar */}
                            <div className="flex-1 min-w-0">
                                <div className="text-[11px] font-semibold text-slate-700 font-mono truncate">
                                    {caller.from_number}
                                </div>
                                <div
                                className="h-1 rounded-full mt-1"
                                style={{ background: caller.background, width: `${(caller.call_count / calls.top_callers[0].call_count) * 100}%` }}
                                >
                                    <div
                                    className="h-full rounded-full"
                                    style={{
                                        background: caller.background,
                                        minWidth: "6px"
                                    }}
                                    />
                                </div>
                            </div>

                            {/* Count */}
                            <span
                            className="text-[11px] font-bold shrink-0"
                            style={{ color: caller.background }}
                            >
                                {caller.call_count}
                            </span>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}