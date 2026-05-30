import { Cpu, Mic, Volume2 } from "lucide-react";

export default function ModelsConfig({ agentData, setAgentData }) {
    const models = [
        { key: "LLM", label: "Language Model (LLM)", icon: <Cpu size={16} />,
          fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}] },
        { key: "STT", label: "Speech-to-Text (STT)", icon: <Mic size={16} />,
          fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}, {label:"Language", key:"language"}] },
        { key: "TTS", label: "Text-to-Speech (TTS)", icon: <Volume2 size={16} />,
          fields: [{label:"Provider", key:"provider"}, {label:"Model Name", key:"model_name"}, {label:"Voice", key:"voice"}, {label:"Language", key:"language"}] }
    ];

    const updateModel = (modelKey, field, value) => {
        setAgentData(prev => ({
            ...prev,
            models_config: {
                ...prev.models_config,
                [modelKey.toLowerCase()]: {
                    ...prev.models_config?.[modelKey.toLowerCase()],
                    [field]: value
                }
            }
        }));
    };

    return(
        <div>
            {models.map((model) => (
                <div key={model.key}
                className="mb-5 p-4 rounded-xl bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#8b949e]">{model.icon}</span>
                        <span className="text-xs font-bold text-[#e6edf3]">{model.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {model.fields.map((field) => (
                            <div key={field.key}>
                                <label className="block text-[10px] font-medium text-[#8b949e] uppercase
                                tracking-wider mb-1.5">
                                    {field.label} <span className="text-[#f85149]">*</span>
                                </label>
                                <input
                                value={agentData.models_config?.[model.key.toLowerCase()]?.[field.key] || ""}
                                onChange={(e) => updateModel(model.key, field.key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                                focus:border-[#58a6ff] transition-colors font-mono"
                                placeholder={field.label}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}