export default function SectionHeader({ icon, title, subtitle }) {
    return (
        <div className="flex items-start gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                {icon}
            </div>
            <div>
            <div className="text-sm font-semibold text-slate-100">{title}</div>
                {subtitle && <div className="text-xs text-slate-500 mt-0.5">{subtitle}</div>}
            </div>
        </div>
    );
}