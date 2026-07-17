import { Columns3Cog, SquareTerminal, Mic, Wrench, ChevronRight, Zap} from "lucide-react"

export default function ConfigMenu({section, setSection}) {
    const configItems = [
        {key: "Prompt", label: "Prompt", icon: SquareTerminal},
        {key: "Models", label: "Models", icon: Columns3Cog},
        {key: "Tools", label: "Tools", icon: Wrench},
        {key: "Voice", label: "Voice", icon: Mic},
        {key: "Actions", label: "Actions", icon: Zap },
    ]
    return(
        <div className="w-52 h-[90vh] space-y-2 shrink-0 border border-[#30363d] overflow-hidden py-6 px-2">
            {configItems.map(item => (
                <div key={item.key}
                >
                    <button
                    onClick={() => {
                        setSection(item.key);
                    }}
                    className={`w-full flex items-start gap-3 px-4 py-2 text-sm font-medium transition-all duration-300 overflow-hidden text-left cursor-pointer
                    ${section===item.key ? "text-[#58a6ff] font-medium bg-[rgba(88,166,255,.12)]" : "hover:bg-[#21262d] hover:scale-100 hover:text-[#e6edf3]"}`}>
                        <div className="flex h-5 w-5 items-center justify-center">
                            <item.icon size={13} stroke={section===item.key ? "#58a6ff" : "currentColor"} />
                        </div>
                        <span className="flex-1 text-left">{item.label}</span>
                        <div className="h-5 w-5 flex items-center justify-center">
                            <ChevronRight size={12} stroke={section===item.key ? "#58a6ff" : "currentColor"} />
                        </div>
                    </button>
                </div>
            ))}
        </div>
    )
}