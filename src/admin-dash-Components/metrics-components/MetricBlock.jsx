export default function MetricBlock({ label, p50, p90, unit = "s", color }) {
    return (
        <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-lg p-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8b949e] mb-2">{label}</p>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[#8b949e]">p50</span>
                <span className="font-mono text-sm font-semibold" style={{ color }}>
                    {p50?.toFixed(2)}{unit}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-[#8b949e]">p90</span>
                <span className="font-mono text-xs text-[#8b949e]">{p90?.toFixed(2)}{unit}</span>
            </div>
        </div>
    );
}