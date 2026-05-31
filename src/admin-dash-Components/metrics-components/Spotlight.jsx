import { AlertTriangle, Star } from "lucide-react";

export default function Spotlight({ spotlight, loading }) {
    if (!spotlight) return null;

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

    return (
        <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Star size={14} stroke="#3fb950" strokeWidth={1.8} />
                    <span className="text-[16px] font-semibold uppercase tracking-widest text-[#3fb950]">
                        Best Performer
                    </span>
                </div>
                <p className="text-lg text-[#e6edf3] font-medium">{spotlight?.best?.tenant_name}</p>
                <p className="font-mono text-xs text-[#8b949e] mt-0.5 truncate">{spotlight?.best?.tenant_id}</p>
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-[#8b949e] uppercase tracking-tighter">E2E p50</span>
                    <span className="text-lg font-semibold text-[#3fb950]"
                    style={{fontFamily: "'IBM Plex Mono', monospace"}}>
                        {spotlight?.best?.e2e_p50}s
                    </span>
                </div>
            </div>
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={14} stroke="#f85149" strokeWidth={1.8} />
                    <span className="text-[16px] font-semibold uppercase tracking-widest text-[#f85149]">
                        Needs Attention
                    </span>
                </div>
                <p className="text-lg text-[#e6edf3] font-medium"
                style={{fontFamily: "'IBM Plex Mono', monospace"}}>{spotlight?.worst?.tenant_name}</p>
                <p className="text-xs text-[#8b949e] mt-0.5 truncate"
                style={{fontFamily: "'IBM Plex Mono', monospace"}}>{spotlight?.worst?.tenant_id}</p>
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-[#8b949e] uppercase tracking-tighter">E2E p50</span>
                    <span className="text-lg font-semibold text-[#f85149]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {spotlight?.worst?.e2e_p50}s
                    </span>
                </div>
            </div>
        </div>
    );
}