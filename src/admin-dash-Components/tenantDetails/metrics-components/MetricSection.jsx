export default function MetricSection(props) {
    const { icon, color, title, children } = props;
    const Icon = icon;
    return (
        <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
                <Icon size={20} stroke={color} strokeWidth={1.8} />
                <span className="text-[16px] font-semibold uppercase tracking-widest" style={{ color }}>
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}