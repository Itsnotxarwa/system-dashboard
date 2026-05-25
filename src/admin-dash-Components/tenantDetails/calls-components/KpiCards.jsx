import { CheckCircle, Clock, Forward, Phone } from "lucide-react"

export default function KpiCards({ calls }) {
    if (!calls) return null;

    const Cards = [
        {
            title: "Total Calls",
            icon: Phone,
            value: calls.volume.total_calls,
            desc: calls.volume.calls_last_30_days + " last 30 days",
            background: "bg-[rgba(88,166,255,.15)]",
            stroke: "#58a6ff",
        },
        {
            title: "Answer Rate",
            icon: CheckCircle,
            value: calls.rates.answer_rate + "%",
            desc: calls.call_status.answered + " answered " + " - " + calls.call_status.voicemail + " voicemail",
            background: "bg-[rgba(63,185,80,.15)]",
            stroke: "#3fb950",
        },
        {
            title: "Avg Duration",
            icon: Clock,
            value: (calls.time.avg_duration_seconds / 60).toFixed(2),
            desc: "Total: " + (calls.time.total_duration_seconds / 60).toFixed(2),
            background: "bg-[rgba(57,211,187,.15)]",
            stroke: "#39d3bb",
        },
        {
            title: "Outbound",
            icon: Forward,
            value: calls.call_type.outbound,
            desc: "vs " + calls.call_type.inbound + " inbound",
            background: "bg-[rgba(188,140,255,.15)]",
            stroke: "#bc8cff",
        }
    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {Cards.map((card, i) => {
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
                        <p className="text-[28px] font-semibold leading-none text-white tracking-tight"
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