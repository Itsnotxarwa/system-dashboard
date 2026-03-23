import { Cpu, Mic, Volume2 } from "lucide-react";

export default function ModelsConfig() {
    const models = [
        { 
            key: "LLM", 
            label: "Language Model (LLM)", 
            icon: <Cpu size={16} />, 
            fields: ["Provider", "Model Name"] },
        { 
            key: "STT", 
            label: "Speech-to-Text (STT)", 
            icon: <Mic size={16} />, 
            fields: ["Provider", "Model Name", "Language"] },
        { 
            key: "TTS", 
            label: "Text-to-Speech (TTS)", 
            icon: <Volume2 size={16} />, 
            fields: ["Provider", "Model Name", "Voice", "Language"] }
    ];
    return(
        <div>
            {models.map((model) => (
                <div
                key={model.key}
                className="mb-5 p-4 rounded-xl bg-[rgba(3,44,166,0.03)] border
                border-[rgba(3,44,166,0.09)]"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span>
                            {model.icon}
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                            {model.label}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {model.fields.map((field) => (
                            <div key={field}>
                                <label 
                                className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                tracking-wider mb-1.5">
                                    {field} <span className="text-[#ef4444]">*</span>
                                </label>
                                <input
                                className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                border-gray-300 placeholder-gray-300 text-slate-800
                                focus:border-[#032ca6] bg-white/90"
                                placeholder={field}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}