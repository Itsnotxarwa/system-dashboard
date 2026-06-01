import { Search } from "lucide-react";

export default function TenantsMetricsTable({ tenantsMetrics, selectedTenant, setSelectedTenant, loading }) {
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
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden flex-1 min-w-0">
            {/* Head: Search bar and number of tenants */}
            <div className="px-5 py-4 border-b border-[#21262d] flex items-center gap-2">
                <div className="relative">
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search tenants..."
                        className="bg-[#0d1117] border border-[#30363d] rounded-md pl-8 pr-3 py-1.5
                        text-[12px] text-[#e6edf3] placeholder-[#8b949e] font-mono outline-none
                        focus:border-[#58a6ff] transition-colors w-52"
                    />
                </div>
                <span className="ml-auto text-[13px] text-[#8b949e] font-mono">{tenantsMetrics.length} tenants</span>
            </div>

            {/* Tenants table */}
            <table className="w-full border-collapse"
            style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr className="border-b border-[#21262d]">
                        {["Tenant", "Sessions", "Turns"].map(h => (
                            <th key={h} className="text-left text-[15px] font-medium text-[#8b949e] px-4 py-3 uppercase tracking-wider whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tenantsMetrics.map((t) => (
                        <tr key={t.tenant_id}
                            className={`border-b border-[#21262d] last:border-0 hover:bg-[rgba(255,255,255,.02)] transition-colors cursor-pointer ${selectedTenant?.tenant_id === t.tenant_id ? 'bg-[rgba(88,166,255,0.12)]' : ''}`}
                            onClick={() => setSelectedTenant(t)}>
                            <td className="px-4 py-3">
                                <p className="text-lg font-medium text-[#e6edf3]">{t.tenant_name}</p>
                                <p className="font-mono text-xs text-[#8b949e] truncate max-w-35">{t.tenant_id}</p>
                            </td>
                            <td className="px-4 py-3 font-mono text-lg text-[#e6edf3]">{t.session_count}</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#e6edf3]">{t.total_turns}</td>
                        {/* <td className="px-4 py-3 font-mono text-lg text-[#58a6ff]">{t.llm_metrics?.ttft_p50}s</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#39d3bb]">{t.llm_metrics?.tps_p50}</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#bc8cff]">{t.tts_metrics?.ttfb_p50}s</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#3fb950]">{t.e2e_latency?.p50}s</td>
                            <td className="px-4 py-3 font-mono text-lg text-[#d29922]">{t.e2e_latency?.p90}s</td>*/} 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}