export default function Tools({agent}) {
    const tools = agent?.tools || [];
    return(
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 p-6">
                <div className="mb-5">
                    <p className="text-[16px] text-white mb-0.5 font-bold">Tools</p>
                    <p className="text-sm text-[#8b949e]">Configure the tools that your agent can use.</p>
                </div>

                <div className="h-px w-full bg-[#30363d] mb-5" />

                <div className="mb-6">
                    {!tools || tools.length === 0 ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No tools configured</div>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            {tools.map((t, i) => (
                                <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-[10px] border
                                    ${t.is_enabled
                                        ? "bg-[#0d1117] border-[#21262d]"
                                        : "bg-[#0d1117] border-[#21262d] opacity-50"}`}>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0
                                            ${t.is_enabled ? "bg-[#3fb950] shadow-[0_0_5px_#3fb950]" : "bg-[#8b949e]"}`} />
                                        <span className="text-xs font-medium text-[#e6edf3] font-mono">
                                            {t.name}
                                        </span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[rgba(88,166,255,.08)] text-[#58a6ff] border border-[rgba(88,166,255,.2)] font-mono">
                                        {t.provider}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}