import { Users, CheckCircle } from "lucide-react";

export default function KpiCards({tenants}) {
    const activeTenants = tenants.filter(t => t.is_active).length;
    const inactiveTenants = tenants.filter(t => !t.is_active).length;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const tenantsThisMonth = tenants.filter(t => {
    const date = new Date(t.created_at);
        return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
        );
    }).length;

    const activationRate = tenants.length
     ? ((activeTenants / tenants.length) * 100).toFixed(1)
    : 0;

    const Cards = [
    {
        title: "Total Tenants",
        icon: Users,
        value: tenants.length,
        desc: `+${tenantsThisMonth} this month`,
        background: "bg-[rgba(88,166,255,.15)]",
        stroke: "#58a6ff",
        strokewidth: "1.7"
    },
    {
        title: "Active Tenants",
        icon: CheckCircle,
        value: activeTenants,
        desc: `${inactiveTenants} inactive tenant${inactiveTenants !== 1 ? "s" : ""}`,
        background: "bg-[rgba(63,185,80,.15)]",
        stroke: "#3fb950",
        strokewidth: "1.8"
    },
    {
        title: "Activation Rate",
        icon: CheckCircle,
        value: `${activationRate}%`,
        desc: "Overall tenant health",
        background: "bg-[rgba(57,211,187,.15)]",
        stroke: "#39d3bb",
        strokewidth: "1.8"
    },
    {
        title: "New This Month",
        icon: Users,
        value: tenantsThisMonth,
        desc: "Tenant growth",
        background: "bg-[rgba(188,140,255,.15)]",
        stroke: "#bc8cff",
        strokewidth: "1.7"
    }
    
]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                        <Icon size={16} stroke={card.stroke} strokeWidth={card.strokewidth} />
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