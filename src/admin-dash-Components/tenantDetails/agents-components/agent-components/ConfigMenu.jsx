import { Columns3Cog, SquareTerminal, Mic, Wrench } from "lucide-react"

export default function ConfigMenu({section, setSection}) {
    const configItems = [
        {key: "Prompt", label: "Prompt", icon: SquareTerminal},
        {key: "Models", label: "Models", icon: Columns3Cog},
        {key: "Tools", label: "Tools", icon: Wrench},
        {key: "Voice", label: "Voice", icon: Mic},
    ]
    return(
        <div className="w-52 h-60 shrink-0 border-r rounded-[5px] border-[#243055] bg-[#0F162B] shadow-[0_10px_40px_rgba(14,99,221,0.18)] overflow-y-auto py-2">
            {configItems.map(item => (
                <div key={item.key}>
                    <button
                    onClick={() => {
                        setSection(item.key);
                    }}
                    className={`w-full flex items-start gap-3 px-4 py-2 text-sm font-medium transition-all duration-300
                    ${section===item.key ? "text-[#58a6ff] font-medium bg-[rgba(88,166,255,.12)]" : "hover:bg-[#21262d] hover:scale-105 hover:text-[#e6edf3]"}`}>
                        <item.icon size={13} stroke={section===item.key ? "#58a6ff" : "currentColor"} />
                        <span className="flex-1 text-left">{item.label}</span>
                    </button>
                </div>
            ))}
        </div>
    )
}