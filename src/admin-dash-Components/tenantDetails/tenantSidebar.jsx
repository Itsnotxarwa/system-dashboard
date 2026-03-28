import { MoveLeft } from "lucide-react";
import Logo from "../../assets/image.png";

export default function TenantSidebar({activeNav, setActiveNav, tenant, navigation}) {
    return(
        <aside className="flex flex-col w-55 px-6 h-screen
        py-8 transition-all duration-300 ease-in-out justify-between">
            <div>
                <div className="flex items-center justify-start border-b border-[rgba(3,44,166,.07)] pb-4">
                    <img src={Logo} alt="Mazia" className="w-30" />
                </div>

                {/* BACK TO TENANTS */}
                <a 
                href="/"
                className="mb-6 group w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs 
                text-slate-500 hover:text-slate-800 transition-all group border border-[rgba(3,44,166,.10)]
                bg-[rgba(3,44,166,.03)]">
                    <MoveLeft />
                    Back to tenants
                </a>
            
                {/* TENANT INFO */}
                <div className="px-4 py-4 border-b border-[rgba(3,44,166,.07)]">
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
                        Current Tenant
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                    bg-[rgba(3,44,166,.05)] border border-[rgba(3,44,166,.10)]">
                        <div className="min-w-0">
                            <div className="ext-xs font-bold text-slate-800 truncate">
                                {tenant?.name || ""}
                            </div>
                            <div className="text-[9px] text-slate-400 truncate font-mono mt-0.5">
                                {tenant?.id || ""}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-3 pt-3 pb-0"></div>

                <nav className="space-y-8 mt-12">
                    <div className="space-y-2">
                        <h3 className="uppercase text-xs font-semibold text-gray-500 tracking-wider">
                            Navigation
                        </h3>
                        <div className="space-y-2">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                return(
                                <button
                                key={item.name}
                                onClick={() => setActiveNav(item.name)}
                                className={`flex items-start
                                justify-start text-left transition-all duration-300 transform cursor-pointer
                                gap-3 px-2 lg:px-4 py-2 text-nowrap text-sm
                                ${
                                    activeNav === item.name
                                    ? "text-black font-medium bg-gray-100"
                                    : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                                }`}>
                                    <Icon size={14} />
                                    <span>{item.name}</span>
                                </button>
                            )})}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}