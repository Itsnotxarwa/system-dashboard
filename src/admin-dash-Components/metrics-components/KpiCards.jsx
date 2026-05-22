import { Clock, MessageSquare, TrendingUp, Users, Zap } from "lucide-react";

export default function KpiCards({metrics}) {
    if (!metrics) return null;

    const totalSessions = metrics.reduce((sum, tenant) => sum + tenant.sessions.total, 0);
    const totalTurns = metrics.reduce((sum, tenant) => sum + tenant.summary.total_turns, 0);
    const avgTTFT = metrics.reduce((sum, tenant) => sum + tenant.summary.ttft_p50, 0) / metrics.length;
    const avgTPS = metrics.reduce((sum, tenant) => sum + tenant.summary.tps_p50, 0) / metrics.length;

    const cards = [
        {
            title: "Total Tenants",
            icon: Users,
            value: metrics.length,
            desc: "Number of active tenants in the system"
        },
        {
            title: "Total Sessions",
            icon: MessageSquare,
            value: totalSessions,
            desc: "Across all tenants"
        },
        {
            title: "Total Turns",
            icon: TrendingUp,
            value: totalTurns,
            desc: "Across all tenants"
        },
        {
            title: "Avg TTFT (p50)",
            icon: Zap,
            value: avgTTFT,
            desc: "Across all tenants"
        },
        {
            title: "Avg TPS (p50)",
            icon: Clock,
            value: avgTPS,
            desc: "Across all tenants"
        }
    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return(
                <div 
                key={i} 
                className="group relative bg-linear-to-br from-white to-[#032ca6]/20  
                rounded-xl p-4 shadow-md transition-all border border-[#032ca6]/5
                duration-300 hover:scale-[1.02]">
                    <div className="relative z-50">
                        <div className="flex items-start justify-between">
                            <h3 className="text-xs font-medium tracking-widest text-[#7a8bb5] uppercase">
                                {card.title}
                            </h3>
                            <div className="w-8.5 h-8.5 rounded-[10px] bg-[linear-gradient(135deg,rgba(3,44,166,0.10),rgba(3,44,166,0.04))]
                            border border-[rgba(3,44,166,0.12)] flex items-center justify-center
                            text-[14px] text-[#032ca6] shrink-0">
                                <Icon size={16} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl tracking-tighter text-[#0a1628] font-semibold leading-0.5">
                                {card.value}
                            </span>
                        </div>
                        <div className="pt-2.5 border-t border-[rgba(3,44,166,0.08)]">
                            <span className="text-xs">
                                {card.desc}
                            </span>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    )
}