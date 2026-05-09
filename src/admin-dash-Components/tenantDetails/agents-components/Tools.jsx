import { Plus, X } from "lucide-react";

export default function Tools({ agentData, setAgentData }) {

    const addTool = () => {
        setAgentData(prev => ({
    ...prev,
    tools: [
        ...(prev.tools || []),
        {
            id: Date.now(),
            name: "",
            url: "",
            provider: "custom",
            is_enabled: true
            }
        ]
        }));
        };

    const removeTool = (id) => {
        setAgentData(prev => ({
            ...prev,
            tools: prev.tools.filter(tool => tool.id !== id)
        }));
    }

    const updateTool = (id, field, value) => {
        setAgentData(prev => ({
        ...prev,
        tools: prev.tools.map(tool =>
        tool.id === id
            ? { ...tool, [field]: value }
            : tool
        )
    }));
    };
    return(
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs font-bold text-slate-700">External Tools</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Add webhook tools the agent can call during conversations.</p>
                </div>
                <button 
                onClick={addTool}
                className="flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all bg-[rgba(3,44,166,0.08)]
                text-[#032ca6] border-[rgba(3,44,166,0.16)]">
                    <Plus />
                    Add Tool
                </button>
            </div>

            {agentData.tools.length === 0 ? (
                <div className="py-10 text-center text-[11px] text-slate-300 rounded-xl border-dashed border-[rgba(3,44,166,0.15)]">
                    No tools added yet. Click "Add Tool" to get started.
                </div>
                ) : (
                <div className="flex flex-col gap-3">
                    {(agentData.tools || []).map((tool, index) => (
                        <div
                        key={tool.id}
                        className="p-4 rounded-xl relative bg-[rgba(3,44,166,0.03)]
                        border border-[rgba(3,44,166,0.10)]">

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    Tool #{index + 1}
                                </span>
                                <button
                                onClick={() => removeTool(tool.id)}
                                className="text-slate-300 hover:text-red-400 transition-colors text-base"
                                >
                                    <X />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                    tracking-wider mb-1.5">
                                        Name <span className="text-[#ef4444]">*</span>
                                    </label>
                                    <input 
                                    type="text" 
                                    value={tool.name}
                                    onChange={(e) => updateTool(tool.id, "name", e.target.value)}
                                    placeholder="" 
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                    border-gray-300 placeholder-gray-400
                                    focus:border-[#032ca6]"
                                    required />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                    tracking-wider mb-1.5">
                                        URL <span className="text-[#ef4444]">*</span>
                                    </label>
                                    <input 
                                    type="text" 
                                    placeholder="https://api.example.com/" 
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                    border-gray-300 placeholder-gray-400
                                    focus:border-[#032ca6]"
                                    value={tool.url}
                                    onChange={(e) => updateTool(tool.id, "url", e.target.value)}
                                    required />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                    tracking-wider mb-1.5">
                                        Provider <span className="text-[#ef4444]">*</span>
                                    </label>
                                    <input 
                                    type="text" 
                                    value={tool.provider}
                                    onChange={(e) => updateTool(tool.id, "provider", e.target.value)}
                                    placeholder="" 
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                    border-gray-300 placeholder-gray-400
                                    focus:border-[#032ca6]"
                                    required />
                                </div>

                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                                        <input 
                                        type="checkbox"
                                        checked={tool.is_enabled}
                                        onChange={(e) => updateTool(tool.id, "is_enabled", e.target.checked)}
                                        />
                                        <span className="text-[11px] text-slate-600">Enabled</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}