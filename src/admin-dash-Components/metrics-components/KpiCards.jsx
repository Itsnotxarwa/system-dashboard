import { Clock, MessageSquare, TrendingUp, Users, Volume2, Zap } from "lucide-react";
import { Activity } from "react";

export default function KpiCards({overview, loading}) {
    if (!overview) return null;

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

    const cards = [
        {
            title: "Total Tenants",
            icon: Users,
            value: overview.total_tenants,
            desc: "Number of active tenants in the system",
            color: "#58a6ff",
        },
        {
            title: "Total Sessions",
            icon: MessageSquare,
            value: overview.total_sessions,
            desc: "Across all tenants",
            color: "#3fb950",
        },
        {
            title: "LLM Turns",
            icon: TrendingUp,
            value: overview.total_llm_turns,
            desc: "Language model",
            color: "#F97316",
        },
        {
            title: "TTS Turns",
            icon: Volume2,
            value: overview.total_tts_turns,
            desc: "Text-to-speech",
            color: "#bc8cff",
        },
        {
            title: "E2E Latency p50",
            icon: Activity,
            value: `${overview.e2e_latency?.p50}s`,
            desc: `p90: ${overview.e2e_latency?.p90}s`,
            color: "#39d3bb"
        }
    ]

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-5">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return(
                <div 
                key={i} 
                className="group relative bg-linear-to-br from-[#1c2230] to-[#161b22]  
                flex items-start gap-3 hover:border-[#30363d]
                rounded-xl p-4 shadow-md transition-all border border-[#21262d]
                duration-300 hover:scale-[1.02]"
                style={{background: `${card.color}18`}}>
                    <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0">
                        <Icon size={24} color={card.color} strokeWidth={1.8} />
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