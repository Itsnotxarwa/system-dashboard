export default function Prompt({form, setForm, isEditing}) {
    const greeting = form?.greeting_message || "";

    const systemPrompt = form?.system_prompt || "";

    const sections = systemPrompt
    ? systemPrompt.split("\n# ")
    : [];
    
    return(
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 p-6">
                <div className="mb-5">
                    <p className="text-[16px] text-white mb-0.5 font-bold">Prompt</p>
                    <p className="text-sm text-[#8b949e]">Configure the messages and instructions that guide your agent.</p>
                </div>

                <div className="h-px w-full bg-[#30363d] mb-5" />

                {/* Greeting */}
                <div className="mb-6">
                <div className="flex items-start gap-5">
                    <div className="w-40 shrink-0 pt-0.5">
                        <p className="text-sm font-semibold text-white mb-1">Greeting Message</p>
                        <p className="text-xs text-[#8b949e] leading-relaxed">The first message the agent will say when the call starts.</p>
                    </div>
                    <div className="flex-1">
                        {!greeting ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No greeting message</div>
                        ) : (
                            isEditing ? (
                                <textarea
                                    value={form.greeting_message || ""}
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
                                            greeting_message: e.target.value
                                        }))
                                    }
                                    className="w-full p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]
                                    text-[#e6edf3] text-xs leading-relaxed font-mono resize-none focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
                                    rows={5}
                                    maxLength={500}
                                />
                            ) : (
                                <div className="p-3 rounded-[10px] bg-[rgba(63,185,80,.06)] border border-[rgba(63,185,80,.15)]
                                italic text-[#e6edf3] text-xs leading-relaxed font-mono">
                                    {greeting}
                                </div>
                            )
                        
                        )}
                        <p className="text-right text-xs text-[#8b949e] mt-1">{greeting.length || 0} / 500</p>
                    </div>
                </div>
                </div>

                {/* System Prompt */}
                <div className="mb-6">
                    <div className="flex items-start gap-5">
                        <div className="w-40 shrink-0 pt-0.5">
                            <p className="text-sm font-semibold text-white mb-1">System Prompt</p>
                            <p className="text-xs text-[#8b949e] leading-relaxed">The core instructions that define the agent's behavior and role.</p>
                        </div>
                        <div className="flex-1">
                            {!systemPrompt ? (
                                <div className="text-xs text-[#8b949e] italic font-mono">No system prompt</div>
                            ) : (
                                isEditing ? (
                                    <textarea
                                        value={form.system_prompt || ""}
                                        onChange={(e) =>
                                            setForm(prev => ({
                                                ...prev,
                                                system_prompt: e.target.value
                                            }))
                                        }
                                        className="w-full p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]
                                        text-[#e6edf3] text-xs leading-relaxed font-mono resize-none focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
                                        rows={10}
                                        maxLength={500}
                                    />
                                ) : (
                                <div className="p-3 rounded-[10px] bg-[rgba(63,185,80,.06)] border border-[rgba(63,185,80,.15)]
                                italic text-[#e6edf3] text-xs leading-relaxed font-mono">
                                    {sections.map((section, index) => {
                                        const lines = section.split("\n");
                                        const title = lines[0].replace("# ", "");
                                        const content = lines.slice(1).join("\n");

                                        return (
                                            <div
                                            key={index}
                                            >
                                                <h3 className="text-[#58a6ff] font-semibold text-sm mb-3">
                                                    {title}
                                                </h3>

                                                <pre className="whitespace-pre-wrap text-xs leading-6 text-[#e6edf3] font-mono">
                                                    {content}
                                                </pre>
                                            </div>
                                        );
                                    })}
                                </div>
                                )
                            )}
                            <p className="text-right text-xs text-[#8b949e] mt-1">{systemPrompt.length || 0} / 500</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}