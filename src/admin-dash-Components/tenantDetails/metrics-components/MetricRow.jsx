export default function MetricRow({ label, value, valueClass = "" }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-[#21262d] last:border-0">
            <span className="text-[11px] text-[#8b949e]">{label}</span>
            <span className={`font-mono text-[12px] font-medium text-[#e6edf3] ${valueClass}`}>
                {value ?? ""}
            </span>
        </div>
    );
}