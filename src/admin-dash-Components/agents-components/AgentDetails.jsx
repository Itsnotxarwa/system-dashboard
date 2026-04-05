import { Cpu, Mic, Volume2, X } from "lucide-react";
import { useState } from "react";

export default function AgentDetails({selectedAgent, onClose}) {
    const [showFull, setShowFull] = useState(false);
    const modelCards = [
        {
            key: "LLM",
            icon: <Cpu size={12} />,
            label: "Language Model (LLM)",
            fields: [
                {
                    label: "Provider",
                    value:(selectedAgent?.models_config.llm.provider || ""),
                },
                {
                    label: "Model Name",
                    value: (selectedAgent?.models_config.llm.model_name || ""),
                }
            ]
        },
        {
            key: "STT",
            icon: <Mic size={12} />,
            label: "Speech-to-Text (STT)",
            fields: [
                {
                    label:"Provider", 
                    value: (selectedAgent?.models_config.stt.provider || ""),
                }, 
                {
                    label:"Model Name", 
                    value: (selectedAgent?.models_config.stt.model_name || ""),
                }, 
                {
                    label:"Language", 
                    value: (selectedAgent?.models_config.stt.language || ""),
                }
            ] 
        }, 
        {
            key: "TTS",
            icon: <Volume2 size={12} />,
            label: "Text-to-Speech (TTS)",
            fields: [
                {
                    label:"Provider", 
                    value: (selectedAgent?.models_config.tts.provider || ""),
                }, 
                {
                    label:"Model Name", 
                    value: (selectedAgent?.models_config.tts.model_name || ""),
                }, 
                {
                    label:"Language", 
                    value: (selectedAgent?.models_config.tts.language || ""),
                },
                {
                    label: "Voice",
                    value: (selectedAgent?.models_config.tts.voice || ""),
                }
            ] 
        }
    ]
    return(
        <div className="flex-col bg-white border-l scroll overflow-y-auto w-120 shrink-0 border-[rgba(3,44,166,.12)]
        shadow-[-4px_0_24px_rgba(3,44,166,.07)]">
            {/* HEADER */}
            <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 border-b border-[rgba(3,44,166,.08)]
            bg-linear-to-br from-white to-[rgba(3,44,166,.04)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black
                shrink-0 bg-linear-to-br from-[#032ca6] to-[#1a6bff] shadow-[0_4px_14px_rgba(3,44,166,.28)]">
                    {selectedAgent.name ? selectedAgent.name
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase())
                    .slice(0,2)
                    .join("") 
                    : ""}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-black text-slate-900 text-base tracking-tight"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        {selectedAgent.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate font-mono">
                        {selectedAgent.id}
                    </div>
                </div>
                <button
                onClick={onClose} 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 
                hover:text-slate-700 text-lg shrink-0 transition-all border border-[rgba(3,44,166,.12)]">
                    <X />
                </button>
            </div>

            <div className="p-5 space-y-5">
                {/* SIP NUMBER & STATUS */}
                <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-[rgba(3,44,166,.04)] border border-[rgba(3,44,166,.09)]">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1.5">
                            Status
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px]
                            ${selectedAgent.is_active ? "text-[#059669]" : "text-[#9ca3af]"}`}>
                            <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                ${selectedAgent.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#d1d5db]"}`}>
                            </span>
                            {selectedAgent.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[rgba(3,44,166,.04)] border border-[rgba(3,44,166,.09)]">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1.5">
                            SIP Number
                        </div>
                        <div className="text-xs font-medium text-[#032ca6]"
                        style={{fontFamily: "'DM Mono',monospace"}}>
                            {selectedAgent.sip_number}
                        </div>
                    </div>
                </div>
                {/* GREETING MESSAGE */}
                <div>
                    <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1.5">
                        Greeting Message
                    </div>
                    <div className="p-3 rounded-[10px] bg-[rgba(5,150,105,.05)] border border-[rgba(5,150,105,.15)] italic text-[#0a1628] text-xs leading-relaxed">
                        {selectedAgent?.greeting_message || ""}
                    </div>
                </div>
                {/* SYSTEM PROMPT */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1.5">
                            System Prompt
                        </div>
                        <button
                        onClick={() => setShowFull(!showFull)}
                        className="text-[9px] px-2.25 py-0.5 rounded-md border border-[rgba(3,44,166,.14)] 
                        bg-[rgba(3,44,166,.05)] text-[#032ca6] cursor-pointer"
                        >
                            {showFull ? "Hide" : "Show full"}
                        </button>
                    </div>
                    {!showFull ? (
                        <div className="relative p-3 rounded-[10px] bg-[rgba(3,44,166,.03)] border border-[rgba(3,44,166,.09)] 
                        max-h-20 text-xs text-[#374151] leading-relaxed overflow-hidden">
                            <pre className="whitespace-pre-wrap">
                                {selectedAgent?.system_prompt.slice(0, 260) || ""}…
                            </pre>
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white 
                            to-transparent" />
                        </div>
                    ) : (
                        <div className="p-3 rounded-[10px] bg-[rgba(3,44,166,.03)] border border-[rgba(3,44,166,.09)]
                        max-h-80 overflow-y-auto">
                            <pre className="leading-relaxed whitespace-pre-wrap">
                                {selectedAgent?.system_prompt || ""}
                            </pre>
                        </div>
                    )}
                </div>
                {/* MODELS */}
                <div>
                    <div className="text-xs text-[#9aabca] uppercase tracking-widest mb-1.5">
                        Models Configuration
                    </div>
                    <div className="space-y-2.5">
                        {modelCards.map((card) => (
                            <div
                            key={card.key}
                            className="py-3 px-3.5 rounded-xl bg-[rgba(3,44,166,0.06)] border border-[rgba(3,44,166,0.08)]">
                                <div className="flex items-center justify-between mb-2">
                                    <span>
                                        {card.icon}
                                    </span>
                                    <span className="text-xs font-bold text-[#0a1628]">
                                        {card.label}
                                    </span>
                                    <span className={`ml-auto text-[10px] font-semibold px-0.5 py-1.75 rounded-[5px] bg-[rgba(3,44,166,0.09)] 
                                        border border-[#032ca6]`}>
                                        {card.fields.find(f => f.label === "Provider")?.value}
                                    </span>
                                </div>
                                {card.fields.map((field,i) => (
                                <div 
                                key={i}
                                className="flex justify-between py-1 border-b border-[rgba(3,44,166,.05)]">
                                    <span className="text-xs text-[#9aabca] capitalize">
                                        {field.label}
                                    </span>
                                    <span className="text-sm text-[#374151] font-semibold"
                                    style={{fontFamily: "'DM Mono',monospace"}}>
                                        {field.value}
                                    </span>
                                </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}