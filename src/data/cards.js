import { Users, CheckCircle, Settings, Activity } from "lucide-react";

const Cards = [
    {
        title: "Total Tenants",
        icon: Users,
        value: 4,
        desc: "+2 this month",
    },
    {
        title: "Active Tenants",
        icon: CheckCircle,
        value: 3,
        desc: "1 inactive tenant",
    },
    {
        title: "Config Verifying",
        icon: Settings,
        value: 12,
        desc: "Across all tenants",
    },
    {
        title: "Sessions Today",
        icon: Activity,
        value: 847,
        desc: "+12 vs yesterday",
    }
    
]

export default Cards;