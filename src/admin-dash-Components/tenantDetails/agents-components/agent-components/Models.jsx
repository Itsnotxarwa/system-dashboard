import { Cpu, Mic, Volume2 } from "lucide-react";

export default function Models({models, handleModelChange, isEditing}) {

    const mc = models;
    const modelCards = mc ? [
        {
            key: "LLM",
            icon: <Cpu size={14} />,
            label: "Language Model (LLM)",
            fields: [
                { label: "Provider", value: mc?.llm?.provider || "" },
                { label: "Model Name", value: mc?.llm?.model_name || "" }
            ],
            style: "bg-[rgba(88,166,255,.12)] border-[rgba(88,166,255,.25)] text-[#58a6ff]",
            background: "bg-[#0d1117]",
            border: "border-[#21262d]"
        },
        {
            key: "STT",
            icon: <Mic size={14} />,
            label: "Speech-to-Text (STT)",
            fields: [
                { label: "Provider", value: mc?.stt?.provider || "" },
                { label: "Model Name", value: mc?.stt?.model_name || "" },
                { label: "Language", value: mc?.stt?.language || "" }
            ],
            style: "bg-[rgba(63,185,80,.12)] border-[rgba(63,185,80,.25)] text-[#3fb950]",
            background: "bg-[#0d1117]",
            border: "border-[#21262d]"
        },
        {
            key: "TTS",
            icon: <Volume2 size={14} />,
            label: "Text-to-Speech (TTS)",
            fields: [
                { label: "Provider", value: mc?.tts?.provider || "" },
                { label: "Model Name", value: mc?.tts?.model_name || "" },
                { label: "Language", value: mc?.tts?.language || "" },
                { label: "Voice", value: mc?.tts?.voice || "" }
            ],
            style: "bg-[rgba(188,140,255,.12)] border-[rgba(188,140,255,.25)] text-[#bc8cff]",
            background: "bg-[#0d1117]",
            border: "border-[#21262d]"
        }
    ] : []

    return(
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 p-6">
                <div className="mb-5">
                    <p className="text-[16px] text-white mb-0.5 font-bold">Models</p>
                    <p className="text-sm text-[#8b949e]">Configure the models that your agent can use.</p>
                </div>

                <div className="h-px w-full bg-[#30363d] mb-5" />

                <div className="mb-6">
                    {!models || models.length === 0 ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No models configured</div>
                    ) : (
                        isEditing ? (
                            <div>
                                {models.map((model) => (
                        <div key={model.key}
                        className="mb-5 p-4 rounded-xl bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#8b949e]">{model.icon}</span>
                                <span className="text-sm font-bold text-[#e6edf3]">{model.label}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {model.fields.map((field) => (
                                    <div key={field.key}>
                                        <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                                            {field.label} <span className="text-[#f85149]">*</span>
                                        </label>
                                        <input
                                        value={models?.[model.key]?.[field.key] || ""}
                                        onChange={(e) => handleModelChange(model.key, field.key, e.target.value)}
                                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                        focus:border-[#58a6ff] transition-colors font-mono"
                                        placeholder={field.label} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                            </div>
                        ) : (
                        <div className="space-y-2.5">
                            {modelCards.filter(card => card.fields.some(f => f.value !== "")).map((card) => (
                                <div key={card.key} className={`py-3 px-3.5 rounded-xl ${card.background} border ${card.border}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[#8b949e]">{card.icon}</span>
                                        <span className="text-xs font-semibold text-[#e6edf3] ml-2 font-mono">
                                            {card.label}
                                        </span>
                                        <span className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-md border font-mono ${card.style}`}>
                                            {card.fields.find(f => f.label === "Provider")?.value}
                                        </span>
                                    </div>
                                    {card.fields.filter(field => field.value).map((field, i) => (
                                        <div key={i} className="flex justify-between py-1.5 border-b border-[#21262d] last:border-0">
                                            <span className="text-[11px] text-[#8b949e] font-mono capitalize">
                                                {field.label}
                                            </span>
                                            <span className="text-[12px] text-[#e6edf3] font-semibold font-mono">
                                                {field.value}
                                            </span>
                                        </div>
                                    ))}
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