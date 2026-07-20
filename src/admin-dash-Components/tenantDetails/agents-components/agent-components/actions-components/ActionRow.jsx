import { ChevronDown, Pencil, Trash2 } from "lucide-react";

export default function ActionRow({ icon, iconBg, name, description, onDelete }) {
    
    return(
        <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#30363d] transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>{icon}</div>
                <div>
                    <div className="text-sm text-[#e6edf3;] font-medium">{name}</div>
                    <div className="text-xs text-[#8b949e]">{description}</div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-slate-400">
                    <ChevronDown size={14} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-slate-400">
                    <Pencil size={14} />
                </button>
                <button 
                onClick={onDelete}
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f85149]/10 text-[#f85149]">
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    )
}