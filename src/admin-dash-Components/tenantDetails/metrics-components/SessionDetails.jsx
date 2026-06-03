import { X } from "lucide-react"
;
export default function SessionDetails({selectedSession, loading, onClose}) {
    if (!selectedSession) return null;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                viewBox="25 25 50 50">
                    <circle
                    className="loading-circle" 
                    r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        )
    }
    return(
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl flex flex-col overflow-hidden w-2xl shrink-0">
            {/* Head */}
            <div className="px-4 py-3 border-b border-[#21262d]">
                <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg grid place-items-center text-sm font-bold text-white 
                    font-mono shrink-0"
                    style={{background:"linear-gradient(135deg,#1c50a0,#58a6ff)"}}>
                        {selectedSession?.room_name ? selectedSession?.room_name
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join("") 
                        : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#e6edf3] text-[16px] tracking-tight">
                            {selectedSession?.room_name}
                        </div>
                        <div className="text-lg text-[#8b949e] mt-0.5">
                            {selectedSession?.last_active} 
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="w-6 h-6 rounded-md border border-[#30363d] bg-transparent text-[#8b949e]
                        hover:text-[#e6edf3] hover:bg-[#21262d] flex items-center justify-center transition-colors shrink-0">
                        <X />
                    </button>
                </div>
            </div>
        </div>
    )
}