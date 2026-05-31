import { AlertTriangle, Star } from "lucide-react";

export default function Spotlight({ spotlight }) {
    return (
        <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Star size={14} stroke="#3fb950" strokeWidth={1.8} />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#3fb950]">
                        Best Performer
                    </span>
                </div>
                <p className="font-mono text-[13px] text-[#e6edf3] font-medium">{spotlight?.best?.tenant_name}</p>
                <p className="font-mono text-[10px] text-[#8b949e] mt-0.5 truncate">{spotlight?.best?.tenant_id}</p>
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] text-[#8b949e] uppercase tracking-wider">E2E p50</span>
                    <span className="font-mono text-lg font-semibold text-[#3fb950]">
                        {spotlight?.best?.e2e_p50}s
                    </span>
                </div>
            </div>
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={14} stroke="#f85149" strokeWidth={1.8} />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f85149]">
                        Needs Attention
                    </span>
                </div>
                <p className="font-mono text-[13px] text-[#e6edf3] font-medium">{spotlight?.worst?.tenant_name}</p>
                <p className="font-mono text-[10px] text-[#8b949e] mt-0.5 truncate">{spotlight?.worst?.tenant_id}</p>
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] text-[#8b949e] uppercase tracking-wider">E2E p50</span>
                    <span className="font-mono text-lg font-semibold text-[#f85149]">
                        {spotlight?.worst?.e2e_p50}s
                    </span>
                </div>
            </div>
        </div>
    );
}