import { Clock, MessageSquare, TrendingUp, Users, Zap } from "lucide-react";

export default function KpiCards({metrics}) {
    if (!metrics) return null;

    const totalSessions = metrics.reduce((sum, tenant) => sum + tenant.session_count, 0);
    const totalTurns = metrics.reduce((sum, tenant) => sum + tenant.total_turns, 0);
    const avgTTFT = (metrics.reduce((sum, tenant) => sum + tenant.avg_ttft, 0) / metrics.length).toFixed(2);
    const avgTPS = (metrics.reduce((sum, tenant) => sum + tenant.avg_tps, 0) / metrics.length).toFixed(2);

    const cards = [
        {
            title: "Total Tenants",
            icon: Users,
            value: metrics.length,
            desc: "Number of active tenants in the system",
            background: "bg-[rgba(88,166,255,.15)]",
            stroke: "#58a6ff",
        },
        {
            title: "Total Sessions",
            icon: MessageSquare,
            value: totalSessions,
            desc: "Across all tenants",
            background: "bg-[rgba(63,185,80,.15)]",
            stroke: "#3fb950",
        },
        {
            title: "Total Turns",
            icon: TrendingUp,
            value: totalTurns,
            desc: "Across all tenants",
            background: "bg-[rgba(249, 115, 22, 0.12)]",
            stroke: "#F97316",
        },
        {
            title: "Avg TTFT",
            icon: Zap,
            value: avgTTFT,
            desc: "Across all tenants",
            background: "bg-[rgba(188,140,255,.15)]",
            stroke: "#bc8cff",
        },
        {
            title: "Avg TPS",
            icon: Clock,
            value: avgTPS,
            desc: "Across all tenants",
            background: "bg-[rgba(57,211,187,.15)]",
            stroke: "#39d3bb"
        }
    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-5">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return(
                <div 
                key={i} 
                className={`group relative bg-linear-to-br from-[#1c2230] to-[#161b22]  
                flex items-start gap-3 hover:border-[#30363d]
                rounded-xl p-4 shadow-md transition-all border border-[#21262d]
                duration-300 hover:scale-[1.02] ${card.background}`}>
                    <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0">
                        <Icon size={24} stroke={card.stroke} strokeWidth={card.strokewidth} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#8b949e] mb-1">
                            {card.title}
                        </p>
                        <p className="text-[28px] font-semibold leading-none tracking-tight"
                        style={{fontFamily: "'IBM Plex Mono', monospace"}}>
                            {card.value}
                        </p>
                        <p className="text-[11px] text-[#8b949e] mt-1.5">
                            {card.desc}
                        </p>
                    </div>
                </div>
            )})}
        </div>
    )
}