import { X } from "lucide-react";
import MetricBlock from "./MetricBlock";

export default function TenantMetricsDetails({selectedTenant, onClose, loading}) {
    if (!selectedTenant) return null;

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
                        {selectedTenant.tenant_name ? selectedTenant.tenant_name
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join("") 
                        : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs font-medium text-[#e6edf3] truncate">
                            {selectedTenant?.tenant_id}
                        </div>
                        <div className="text-lg text-[#8b949e] mt-0.5">
                            {selectedTenant?.session_count} sessions · {selectedTenant?.total_turns} turns
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="w-6 h-6 rounded-md border border-[#30363d] bg-transparent text-[#8b949e]
                        hover:text-[#e6edf3] hover:bg-[#21262d] flex items-center justify-center transition-colors shrink-0">
                        <X />
                    </button>
                </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Summary row */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                    { label: "Sessions", value: selectedTenant?.session_count,              color: "#e6edf3" },
                    { label: "Turns",    value: selectedTenant?.total_turns,                color: "#e6edf3" },
                    { label: "E2E p50",  value: selectedTenant?.e2e_latency?.p50?.toFixed(2) + "s",  color: "#3fb950" },
                    ].map(c => (
                    <div key={c.label} className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-lg p-2.5">
                        <div className="text-sm font-semibold uppercase tracking-widest text-[#8b949e] mb-1">{c.label}</div>
                        <div className="font-mono text-base font-semibold leading-none" style={{ color: c.color }}>{c.value}</div>
                        {c.label === "E2E p50" && (
                        <div className="font-mono text-sm text-[#8b949e] mt-1">p90 {selectedTenant?.e2e_latency?.p90?.toFixed(2)}s</div>
                        )}
                    </div>
                    ))}
                </div>

                {/* LLM */}
                <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-lg p-3 mb-2">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#58a6ff] mb-2">LLM metrics</p>
                    <div className="grid grid-cols-2 gap-2">
                    <MetricBlock label="TTFT" p50={selectedTenant.llm_metrics?.ttft_p50} p90={selectedTenant.llm_metrics?.ttft_p90} color="#58a6ff" />
                    <MetricBlock label="TPS"  p50={selectedTenant.llm_metrics?.tps_p50}  p90={selectedTenant.llm_metrics?.tps_p90}  unit="" color="#39d3bb" />
                    </div>
                </div>

                {/* TTS */}
                <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-lg p-3 mb-2">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#bc8cff] flex gap-2 mb-2">TTS metrics
                        <span className="text-xs font-mono text-[#8b949e] bg-[#21262d] px-1.5 py-0.5 rounded">
                            {selectedTenant.tts_metrics?.total_turns} total turns
                        </span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                    <MetricBlock label="TTFB" p50={selectedTenant.tts_metrics?.ttfb_p50} p90={selectedTenant.tts_metrics?.ttfb_p90} color="#bc8cff" />
                    </div>
                </div>

                {/* EOU */}
                <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-lg p-3">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#F97316] mb-2">EOU metrics</p>
                    <div className="grid grid-cols-2 gap-2">
                    <MetricBlock label="Transcription" p50={selectedTenant.eou_metrics?.transcription_delay_p50}    p90={selectedTenant.eou_metrics?.transcription_delay_p90}    color="#F97316" />
                    <MetricBlock label="Utterance"     p50={selectedTenant.eou_metrics?.end_of_utterance_delay_p50} p90={selectedTenant.eou_metrics?.end_of_utterance_delay_p90} color="#d29922" />
                    </div>
                </div>
            </div>
        </div>
    )
}