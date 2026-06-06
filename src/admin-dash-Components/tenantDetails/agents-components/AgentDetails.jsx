import { Cpu, Edit, Mic, Trash, Volume2, X } from "lucide-react";
import { useState } from "react";

export default function AgentDetails({selectedAgent, onClose, handleDelete, handleEdit}) {
    const [showFull, setShowFull] = useState(false);
    if (!selectedAgent) return null;
    const mc = selectedAgent.models_config;
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
        <div className="flex-col bg-[#161b22] border-l scroll overflow-y-auto w-120 shrink-0 border-[#21262d]
        shadow-[-4px_0_24px_rgba(0,0,0,.4)] ">
            {/* HEADER */}
            <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 border-b border-[#21262d] bg-[#161b22]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold
                shrink-0"
                style={{background:"linear-gradient(135deg,#1c50a0,#58a6ff)"}}>
                    {selectedAgent.name ? selectedAgent.name
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase())
                    .slice(0,2)
                    .join("")
                    : ""}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#e6edf3] text-sm tracking-tight">
                        {selectedAgent.name}
                    </div>
                    <div className="text-[11px] text-[#8b949e] mt-0.5 truncate font-mono">
                        {selectedAgent.id}
                    </div>
                </div>
                <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8b949e]
                hover:text-[#e6edf3] shrink-0 transition-all border border-[#30363d] hover:border-[#58a6ff]">
                    <X size={15} />
                </button>
            </div>

            {/* FORM */}
            <div className="p-5 space-y-5">
                {/* STATUS & SIP */}
                <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                        <div className="text-[9px] text-[#8b949e] uppercase tracking-widest mb-1.5 font-mono">
                            Status
                        </div>
                        <span className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-full w-fit
                            ${selectedAgent.is_active
                                ? "text-[#3fb950] bg-[rgba(63,185,80,.1)] border border-[rgba(63,185,80,.25)]"
                                : "text-[#8b949e] bg-[#21262d] border border-[#30363d]"}`}>
                            <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                ${selectedAgent.is_active ? "bg-[#3fb950] shadow-[0_0_5px_#3fb950]" : "bg-[#8b949e]"}`} />
                            {selectedAgent.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                        <div className="text-[9px] text-[#8b949e] uppercase tracking-widest mb-1.5 font-mono">
                            SIP Number
                        </div>
                        <div className="text-xs font-medium text-[#58a6ff] font-mono">
                            {selectedAgent.sip_number}
                        </div>
                    </div>
                </div>

                {/* GREETING MESSAGE */}
                <div>
                    <div className="text-[9px] text-[#8b949e] uppercase tracking-widest mb-1.5 font-mono">
                        Greeting Message
                    </div>
                    {!selectedAgent?.greeting_message ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No greeting message</div>
                    ) : (
                        <div className="p-3 rounded-[10px] bg-[rgba(63,185,80,.06)] border border-[rgba(63,185,80,.15)]
                        italic text-[#e6edf3] text-xs leading-relaxed font-mono">
                            {selectedAgent?.greeting_message || ""}
                        </div>
                    )}
                </div>

                {/* SYSTEM PROMPT */}
                {!selectedAgent?.system_prompt ? (
                    <div>
                        <div className="text-[9px] text-[#8b949e] uppercase tracking-widest mb-1.5 font-mono">
                            System Prompt
                        </div>
                        <div className="text-xs text-[#8b949e] italic font-mono">No system prompt</div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <div className="text-[9px] text-[#8b949e] uppercase tracking-widest font-mono">
                                System Prompt
                            </div>
                            <button
                            onClick={() => setShowFull(!showFull)}
                            className="text-[11px] px-2.5 py-0.5 rounded-md border border-[rgba(88,166,255,.25)]
                            bg-[rgba(88,166,255,.08)] text-[#58a6ff] cursor-pointer font-mono hover:bg-[rgba(88,166,255,.15)] transition-colors"
                            >
                                {showFull ? "Hide" : "Show full"}
                            </button>
                        </div>
                        {!showFull ? (
                            <div className="relative p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]
                            max-h-20 text-xs text-[#c9d1d9] leading-relaxed overflow-hidden">
                                <pre className="whitespace-pre-wrap font-mono">
                                    {selectedAgent?.system_prompt.slice(0, 260) || ""}…
                                </pre>
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-[#0d1117] to-transparent" />
                            </div>
                        ) : (
                            <div className="p-3 rounded-[10px] bg-[#0d1117] border border-[#21262d]
                            max-h-80 overflow-y-auto">
                                <pre className="leading-relaxed whitespace-pre-wrap text-xs text-[#c9d1d9] font-mono">
                                    {selectedAgent?.system_prompt || ""}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                {/* MODELS */}
                <div>
                    <div className="text-[9px] text-[#8b949e] uppercase tracking-widest mb-2 font-mono">
                        Models Configuration
                    </div>
                    {!selectedAgent?.models_config ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No models configured</div>
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
                    )}
                </div>

                {/* TOOLS */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-[9px] text-[#8b949e] uppercase tracking-widest font-mono">
                            Tools
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[rgba(88,166,255,.08)] text-[#58a6ff] border border-[rgba(88,166,255,.2)] font-mono">
                            {selectedAgent?.tools?.filter(t => t.is_enabled).length || 0} enabled
                        </span>
                        {selectedAgent?.tools?.filter(t => !t.is_enabled).length > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#0d1117] text-[#8b949e] border border-[#21262d] font-mono">
                                {selectedAgent.tools.filter(t => !t.is_enabled).length} disabled
                            </span>
                        )}
                    </div>

                    {!selectedAgent?.tools || selectedAgent.tools.length === 0 ? (
                        <div className="text-[11px] text-[#8b949e] italic font-mono">No tools configured</div>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            {selectedAgent.tools.map((t, i) => (
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

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-2 pb-1">
                    <button
                    onClick={() => handleEdit(selectedAgent)}
                    className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-semibold
                    transition-all flex items-center gap-1.5 font-mono
                    text-[#58a6ff] bg-[rgba(88,166,255,.08)] border border-[rgba(88,166,255,.25)]
                    hover:bg-[rgba(88,166,255,.15)]">
                        <Edit size={12} />
                        Edit
                    </button>
                    <button
                    onClick={() => handleDelete(selectedAgent)}
                    className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-semibold transition-all
                    flex items-center gap-1.5 font-mono
                    border border-[rgba(248,81,73,.25)] bg-[rgba(248,81,73,.08)]
                    text-[#f85149] hover:bg-[rgba(248,81,73,.15)]">
                        <Trash size={12} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}