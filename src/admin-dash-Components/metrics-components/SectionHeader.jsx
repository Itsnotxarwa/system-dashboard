export default function SectionHeader(props) {
    const { icon, label, color } = props;
    const Icon = icon;

    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md grid place-items-center"
                style={{ background: `${color}18` }}>
                <Icon size={14} stroke={color} strokeWidth={1.8} />
            </div>
            <span className="text-[16px] font-semibold uppercase tracking-widest"
                style={{ 
                    color, 
                fontFamily: "'Cabinet', sans-serif" }}>{label}</span>
        </div>
    );
}