export default function MetricCell({ label, p50, p90, unit = "s", color = "#58a6ff" }) {
    return (
        <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-xl p-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8b949e] mb-3">{label}</p>
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8b949e]">p50</span>
                    <span className="font-mono text-sm font-semibold" style={{ color }}>
                        {p50 != null ? `${p50}${unit}` : "—"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8b949e]">p90</span>
                    <span className="font-mono text-sm text-[#8b949e]">
                        {p90 != null ? `${p90}${unit}` : "—"}
                    </span>
                </div>
            </div>
        </div>
    );
}