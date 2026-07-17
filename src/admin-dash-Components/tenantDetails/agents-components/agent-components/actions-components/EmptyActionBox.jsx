import { Plus, Zap } from "lucide-react";

export default function EmptyActionBox({addLabel, onClick}) {
    return(
        <div className="border border-dashed border-[#30363d] rounded-xl bg-transparent flex flex-col items-center justify-center py-10 gap-4">
            <div className="flex items-center gap-2 text-[#e6edf3] text-sm">
                <Zap size={14} />
                Aucune action disponible
            </div>
            <button 
                onClick={onClick}
                className="cursor-pointer flex items-center gap-1.5 text-sm px-6 py-2.5 rounded-lg 
                text-[#58a6ff] hover:bg-[rgba(88,166,255,.08)] border border-[rgba(88,166,255,.25)]
                transition-colors font-mono">
                <span className="text-[#58a6ff] text-base leading-none">
                    <Plus size={14} />
                </span> {addLabel}
            </button>
        </div>
    )
}