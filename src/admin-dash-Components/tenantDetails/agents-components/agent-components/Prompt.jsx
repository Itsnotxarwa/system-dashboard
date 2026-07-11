export default function Prompt({agent}) {
    const greeting = agent?.greeting_message || "";
    
    return(
        <div className="flex-1 overflow-y-auto bg-[#0b0d18] flex flex-col">
            <div className="flex-1 p-6">
                <div className="mb-5">
                    <p className="text-sm text-[#3a4570] mb-0.5">Prompt</p>
                    <p className="text-[16px] text-[#2e3870]">Configure the messages and instructions that guide your agent.</p>
                </div>

                {/* Greeting */}
                <div className="mb-6">
                <div className="flex items-start gap-5">
                    <div className="w-40 shrink-0 pt-0.5">
                        <p className="text-[12px] font-semibold text-white mb-1">Greeting Message</p>
                        <p className="text-[10.5px] text-[#3a4570] leading-relaxed">The first message the agent will say when the call starts.</p>
                    </div>
                    <div className="flex-1">
                        {!greeting ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No greeting message</div>
                    ) : (
                        <div className="p-3 rounded-[10px] bg-[rgba(63,185,80,.06)] border border-[rgba(63,185,80,.15)]
                        italic text-[#e6edf3] text-xs leading-relaxed font-mono">
                            {greeting}
                        </div>
                    )}
                        <p className="text-right text-[10px] text-[#2e3870] mt-1">{greeting.length || 0} / 500</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}