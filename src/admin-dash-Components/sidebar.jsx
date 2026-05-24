import { NavLink } from "react-router-dom";
import { Building, Phone, KeyRound, ChartColumn, LogOut, Bot } from "lucide-react";
import Logo from "../assets/image_logo.png";
import Mazia from "../assets/mazia.png"


export default function Sidebar() {

    const handleLogout = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(
            "https://api.voixup.fr/auth/logout",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            console.error("Logout failed");
        }

    } catch (err) {
        console.error(err);
    } finally {
        localStorage.removeItem("token");

        window.location.href = "https://mazia-login.vercel.app/";
    }
};

    const main = [
        { name: "tenants", label: "Tenants", href: "/", icon: <Building size={20} /> },
        { name: "agents", label: "Agents", href: "/agents", icon: <Bot size={20} /> },
        { name: "calls&sessions", label: "Calls & Sessions", href:"/calls&sessions", icon: <Phone size={20} /> },
        {name: "metrics", label: "Metrics", href: "/metrics", icon: <ChartColumn size={20} />},
    ];

    const system = [
        { name: "apikeys", label: "API Keys", href: "/api-keys", icon: <KeyRound size={20} /> },
        { name: "analytics", label: "Analytics", href: "/analytics", icon: <ChartColumn size={20} /> },
    ];


    return(
            <aside className="flex flex-col w-55 px-6 h-screen bg-[#161b22] shrink-0 border-r
            border-[#21262d] fixed top-0 left-0 bottom-0 z-50 py-8">
                <div className="flex items-center gap-2 px-4 py-4.5 border-b border-[#21262d]">
                    <div className="flex items-center justify-center gap-2">
                        <img src={Logo} alt="Mazia" className="w-7" />
                        <img src={Mazia} alt="Mazia" className="w-14" />
                    </div>
                </div>
                
                <nav className="flex-1 px-2 pt-3">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8b949e] px-2 pb-2">
                        Main
                    </h3>
                    <div className="space-y-2">
                        {main.map((link) => (
                            <NavLink
                            to={link.href}
                            key={link.name}
                            className={({ isActive }) => `flex items-start text-[#8b949e]
                            justify-start text-left transition-all duration-300 transform cursor-pointer
                            gap-3 px-2 lg:px-4 py-2 text-nowrap text-sm 
                            ${isActive
                                ? "text-[#58a6ff] font-medium bg-[rgba(88,166,255,.12)]"
                                : "hover:bg-[#21262d] hover:scale-105 hover:text-[#e6edf3]"
                            }`
                            }
                            >
                                {link.icon}
                                <span className="transition-all duration-300 ease-in-out">{link.label}</span>
                            </NavLink>
                        ))}
                    </div>
                    <h3 className="uppercase text-xs font-semibold text-[#8b949e] tracking-wider">
                        System
                    </h3>
                    {system.map((link) => (
                    <NavLink
                    to={link.href}
                        key={link.name}
                        className={({ isActive }) => `flex items-start justify-start text-left transition-all duration-300 transform cursor-pointer
                        gap-3 px-4 py-2 text-nowrap text-sm text-[#8b949e]
                        ${isActive
                            ? "text-[#58a6ff] font-medium bg-[rgba(88,166,255,.12)]"
                            : "hover:bg-[#21262d] hover:scale-105 hover:text-[#e6edf3]"
                        }`
                    }   
                    >
                            {link.icon}
                            <span className="transition-all duration-300 ease-in-out">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
                
                <div className="border-t border-[#21262d] py-3 px-2">
                    <div className="flex items-center gap-0.5 p-2.5 rounded-xl 
                    relative">
                        <div className="flex-1">
                        </div>
                        <button
                        onClick={handleLogout}
                        className="w-7 h-7 flex items-center justify-center rounded-lg 
                        bg-white border border-gray-200 text-gray-500 cursor-pointer
                        hover:bg-red-50 hover:border-red-200 hover:text-red-400 
                        transition-all duration-300 shrink-0 absolute right-2"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>

            </aside>

    )
}