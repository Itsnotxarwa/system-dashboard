import { Radio } from "lucide-react";

export default function TenantsMetricsTable({ tenantsMetrics, loading }) {
    if (!tenantsMetrics) return null;

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
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden mt-6 mb-6">
            <div className="px-5 py-4 border-b border-[#21262d] flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0"
                style={{background: "rgba(88,166,255,0.12)"}}>
                    <Radio size={14} stroke="#58a6ff" strokeWidth={1.8} />
                </div>
                <span className="text-[16px] font-semibold uppercase tracking-widest text-[#58a6ff]">
                    Per-Tenant Breakdown
                </span>
                <span className="ml-auto text-[13px] text-[#8b949e] font-mono">{tenantsMetrics.length} tenants</span>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#21262d]">
                        {["Tenant", "Sessions", "Turns", "LLM TTFT p50", "LLM TPS p50", "TTS TTFB p50", "E2E p50", "E2E p90"].map(h => (
                            <th key={h} className="text-left text-sm font-medium text-[#8b949e] px-4 py-3 uppercase tracking-wider whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tenantsMetrics.map((t) => (
                        <tr key={t.tenant_id}
                            className={`border-b border-[#21262d] last:border-0 hover:bg-[rgba(255,255,255,.02)] transition-colors cursor-pointer`}>
                            <td className="px-4 py-3">
                                <p className="text-lg font-medium text-[#e6edf3]">{t.tenant_name}</p>
                                <p className="font-mono text-xs text-[#8b949e] truncate max-w-35">{t.tenant_id}</p>
                            </td>
                            <td className="px-4 py-3 font-mono text-lg text-[#e6edf3]">{t.session_count}</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#e6edf3]">{t.total_turns}</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#58a6ff]">{t.llm_metrics?.ttft_p50}s</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#39d3bb]">{t.llm_metrics?.tps_p50}</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#bc8cff]">{t.tts_metrics?.ttfb_p50}s</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#3fb950]">{t.e2e_latency?.p50}s</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#d29922]">{t.e2e_latency?.p90}s</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}