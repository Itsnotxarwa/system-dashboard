import { Plus } from "lucide-react"

export default function Tools({tools, updateTool, addTool, removeTool, isEditing}) {
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
                        isEditing ? (
                            <div className="flex flex-col gap-3">
                                <button onClick={addTool}
                                className="flex items-center gap-1 ml-0 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all
                                bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.2)]">
                                    <Plus size={14} />
                                    Add Tool
                                </button>
                                <div className="flex flex-col gap-3">
                                {(tools || []).map((tool, index) => (
                                <div key={index}
                                className="p-4 rounded-xl relative bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-bold text-[#8b949e] uppercase tracking-widest">
                                            Tool #{index + 1}
                                        </span>
                                        <button onClick={() => removeTool(index)}
                                        className="text-[#8b949e] hover:text-[#f85149] transition-colors">
                                            <X size={21} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        <div>
                                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                                Name <span className="text-[#f85149]">*</span>
                                            </label>
                                            <input type="text" value={tool.name}
                                            onChange={(e) => updateTool(index, "name", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                            focus:border-[#58a6ff] transition-colors font-mono" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                                URL <span className="text-[#f85149]">*</span>
                                            </label>
                                            <input type="text" placeholder="https://api.example.com/"
                                            value={tool.url} onChange={(e) => updateTool(index, "url", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                            focus:border-[#58a6ff] transition-colors font-mono" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                                Provider <span className="text-[#f85149]">*</span>
                                            </label>
                                            <input type="text" value={tool.provider}
                                            onChange={(e) => updateTool(index, "provider", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                            focus:border-[#58a6ff] transition-colors font-mono" required />
                                        </div>
                                        <div className="flex items-end">
                                            <label className="flex items-center gap-2 cursor-pointer pb-2">
                                                <input type="checkbox" checked={tool.is_enabled}
                                                onChange={(e) => updateTool(index, "is_enabled", e.target.checked)} />
                                                <span className="text-xs text-[#8b949e]">Enabled</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                ))}
                                </div>
                            </div>
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
                        )
                    )}
                </div>
            </div>
        </div>
    )
}