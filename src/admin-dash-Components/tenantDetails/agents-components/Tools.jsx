import { Plus, X } from "lucide-react";

export default function Tools({ agentData, setAgentData }) {
    const addTool = () => {
        setAgentData(prev => ({
            ...prev,
            tools: [...(prev.tools || []), { id: Date.now(), name: "", url: "", provider: "custom", is_enabled: true }]
        }));
    };

    const removeTool = (id) => {
        setAgentData(prev => ({ ...prev, tools: prev.tools.filter(tool => tool.id !== id) }));
    };

    const updateTool = (id, field, value) => {
        setAgentData(prev => ({
            ...prev,
            tools: prev.tools.map(tool => tool.id === id ? { ...tool, [field]: value } : tool)
        }));
    };

    return(
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs font-bold text-[#e6edf3]">External Tools</p>
                    <p className="text-[10px] text-[#8b949e] mt-0.5">Add webhook tools the agent can call during conversations.</p>
                </div>
                <button
                onClick={addTool}
                className="flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all
                bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.2)]">
                    <Plus />
                    Add Tool
                </button>
            </div>

            {agentData.tools.length === 0 ? (
                <div className="py-10 text-center text-[11px] text-[#8b949e] rounded-xl border border-dashed border-[#30363d]">
                    No tools added yet. Click "Add Tool" to get started.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {(agentData.tools || []).map((tool, index) => (
                        <div key={tool.id}
                        className="p-4 rounded-xl relative bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">
                                    Tool #{index + 1}
                                </span>
                                <button onClick={() => removeTool(tool.id)}
                                className="text-[#8b949e] hover:text-[#f85149] transition-colors">
                                    <X />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                        Name <span className="text-[#f85149]">*</span>
                                    </label>
                                    <input type="text" value={tool.name}
                                    onChange={(e) => updateTool(tool.id, "name", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                    focus:border-[#58a6ff] transition-colors font-mono" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                        URL <span className="text-[#f85149]">*</span>
                                    </label>
                                    <input type="text" placeholder="https://api.example.com/"
                                    value={tool.url} onChange={(e) => updateTool(tool.id, "url", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                    focus:border-[#58a6ff] transition-colors font-mono" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                        Provider <span className="text-[#f85149]">*</span>
                                    </label>
                                    <input type="text" value={tool.provider}
                                    onChange={(e) => updateTool(tool.id, "provider", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                    focus:border-[#58a6ff] transition-colors font-mono" required />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                                        <input type="checkbox" checked={tool.is_enabled}
                                        onChange={(e) => updateTool(tool.id, "is_enabled", e.target.checked)} />
                                        <span className="text-[11px] text-[#8b949e]">Enabled</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}