import { Columns3Cog, SquareTerminal, Mic, Wrench } from "lucide-react"

export default function ConfigMenu({section, setSection}) {
    const configItems = [
        {key: "Prompt", label: "Prompt", icon: SquareTerminal},
        {key: "Models", label: "Models", icon: Columns3Cog},
        {key: "Tools", label: "Tools", icon: Wrench},
        {key: "Voice", label: "Voice", icon: Mic},
    ]
    return(
        <div className="w-48 shrink-0 border-r border-[#1e2235] bg-[#0d0f1a] overflow-y-auto py-2">
            {configItems.map(item => (
                <div key={item.key}>
                    <button
                    onClick={() => {
                        setSection(item.key);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-[12px] font-medium transition-all duration-100
                    ${section===item.key ? "text-white bg-[#111428]" : "text-[#4a5580] hover:text-[#9aa8d0] hover:bg-[#0e1020]"}`}>
                        <item.icon size={13} stroke={section===item.key ? "#4f6ef7" : "currentColor"} />
                        <span className="flex-1 text-left">{item.label}</span>
                    </button>
                </div>
            ))}
        </div>
    )
}