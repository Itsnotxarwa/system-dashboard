import { MoveLeft } from "lucide-react";
import Logo from "../../assets/image.png";
import { NavLink, useParams } from "react-router-dom";
import { Bot, CassetteTape } from "lucide-react";

export default function TenantSidebar({tenant}) {
    const {id} = useParams();
    const navigation =[
        { name: "Agents", icon: Bot, href: "agents" },
        { name: "Call Records", icon: CassetteTape, href: "call-records" },
    ];

    return(
        <aside className="flex flex-col w-55 px-6 h-screen
        py-8 transition-all duration-300 ease-in-out justify-between">
            <div>
                <div className="flex items-center justify-start border-b border-[rgba(3,44,166,.10)] pb-8">
                    <img src={Logo} alt="Mazia" className="w-30" />
                </div>

                {/* BACK TO TENANTS */}
                <div className="border-b border-[rgba(3,44,166,.10)] py-4">
                    <a 
                    href="/"
                    className="group w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs 
                    text-slate-500 hover:text-slate-800 transition-all group 
                    bg-[rgba(3,44,166,.03)]">
                        <MoveLeft />
                        Back to tenants
                    </a>
                </div>
            
                {/* TENANT INFO */}
                <div className="py-4 border-b border-[rgba(3,44,166,.03)]">
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
                        Current Tenant
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                    bg-[rgba(3,44,166,.05)] border border-[rgba(3,44,166,.10)]">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white 
                        text-[11px] font-black shrink-0 bg-linear-to-br from-[#0366a6] to-[#1e40af] 
                        shadow-[0_6px_18px_rgba(3,44,166,.22)]">
                            {tenant?.name ? tenant.name
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase())
                            .slice(0,2)
                            .join("") 
                            : ""}
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-800 truncate">
                                {tenant?.name || ""}
                            </div>
                            <div className="text-xs text-slate-400 truncate font-mono mt-0.5">
                                {tenant?.id || ""}
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="space-y-8 py-4">
                    <div className="space-y-2">
                        <h3 className="uppercase text-xs font-semibold text-gray-500 tracking-wider">
                            Navigation
                        </h3>
                        <div className="space-y-2">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                return(
                                <NavLink
                                to={`/tenant/${id}/${item.href}`}
                                key={item.name}
                                className={({ isActive }) => `flex items-start justify-start text-left transition-all duration-300 transform cursor-pointer
                                gap-3 px-4 py-2 text-nowrap text-sm
                                ${isActive
                                    ? "text-black font-medium bg-gray-100"
                                    : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                                }`
                                }>
                                    <Icon size={14} />
                                    <span>{item.name}</span>
                                </NavLink>
                            )})}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}