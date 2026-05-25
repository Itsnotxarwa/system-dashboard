import { MoveLeft, Target } from "lucide-react";
import Logo from "../../assets/image_logo.png";
import Mazia from "../../assets/mazia.png";
import { NavLink, useParams } from "react-router-dom";
import { Bot, CassetteTape } from "lucide-react";

export default function TenantSidebar({tenant}) {
    const {id} = useParams();
    const navigation =[
        { name: "Agents", icon: Bot, href: "agents" },
        { name: "Call Records", icon: CassetteTape, href: "call-records" },
        { name: "Campaign", icon: Target, href: "campaign" },
    ];

    return(
        <aside className="flex flex-col w-55 px-6 h-screen bg-[#161b22] shrink-0 border-r
            border-[#21262d] fixed top-0 left-0 bottom-0 z-50 py-8">
            <div>
                <div className="flex items-center justify-start border-b border-[#21262d] pb-8">
                    <div className="flex items-center justify-center gap-2">
                        <img src={Logo} alt="Mazia" className="w-7" />
                        <img src={Mazia} alt="Mazia" className="w-14" />
                    </div>
                </div>

                {/* BACK TO TENANTS */}
                <div className="border-b border-[#21262d] py-4">
                    <a 
                    href="/"
                    className="group w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs 
                    text-[#e6edf3] hover:opacity-90 transition-all group border border-[#30363d] 
                    bg-[#161b22]">
                        <MoveLeft />
                        Back to tenants
                    </a>
                </div>
            
                {/* TENANT INFO */}
                <div className="py-4 border-b border-[#21262d]">
                    <div className="text-xs font-medium text-[#8b949e] uppercase tracking-widest mb-3">
                        Current Tenant
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                    bg-[#161b22] border border-[#30363d]">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white 
                            text-[11px] font-bold shrink-0 bg-linear-to-br from-[#1c50a0] to-[#3b6fbf]">
                            {tenant?.name ? tenant.name
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase())
                            .slice(0,2)
                            .join("") 
                            : ""}
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-bold text-[#8b949e] truncate"
                            style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                                {tenant?.name || ""}
                            </div>
                            <div className="text-xs text-[#8b949e] truncate mt-0.5"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {tenant?.id || ""}
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-2 pt-3">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8b949e] px-2 pb-2">
                        Navigation
                    </h3>
                    <div className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            return(
                            <NavLink
                            to={`/tenant/${id}/${item.href}`}
                            key={item.name}
                            className={({ isActive }) => `flex items-start text-[#8b949e]
                            justify-start text-left transition-all duration-300 transform cursor-pointer
                            gap-3 px-2 lg:px-4 py-2 text-nowrap text-sm 
                            ${isActive
                                ? "text-[#58a6ff] font-medium bg-[rgba(88,166,255,.12)]"
                                : "hover:bg-[#21262d] hover:scale-105 hover:text-[#e6edf3]"
                            }`
                            }
                            >
                                <Icon size={14} />
                                <span className="transition-all duration-300 ease-in-out">{item.name}</span>
                            </NavLink>
                        )})}
                    </div>
                </nav>
            </div>
        </aside>
    )
}