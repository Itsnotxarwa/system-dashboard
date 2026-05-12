import { NavLink } from "react-router-dom";
import { Building, Phone, KeyRound, ChartColumn, LogOut, Bot } from "lucide-react";
import Logo from "../assets/image.png";


export default function Sidebar({role}) {

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
    ];

    const system = [
        { name: "apikeys", label: "API Keys", href: "/api-keys", icon: <KeyRound size={20} /> },
        { name: "analytics", label: "Analytics", href: "/analytics", icon: <ChartColumn size={20} /> },
    ];


    return(
            <aside className="flex flex-col  w-55 px-6 h-screen
            py-8 transition-all duration-300 ease-in-out justify-between">
                <div>
                <div className="flex items-center justify-start">
                    <img src={Logo} alt="Mazia" className="w-30" />
                </div>
                
                <nav className="space-y-8 mt-12">
                    <div className="space-y-2">
                        <h3 className="uppercase text-xs font-semibold text-gray-500 tracking-wider">Main</h3>
                        <div className="space-y-2">
                            {main.map((link) => (
                                <NavLink
                                to={link.href}
                                key={link.name}
                                className={({ isActive }) => `flex items-start 
                                justify-start text-left transition-all duration-300 transform cursor-pointer
                                gap-3 px-2 lg:px-4 py-2 text-nowrap text-sm
                                ${isActive
                                    ? "text-black font-medium bg-gray-100"
                                    : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                                }`
                                }
                                >
                                    {link.icon}
                                    <span className="transition-all duration-300 ease-in-out">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="uppercase text-xs font-semibold text-gray-500 tracking-wider">System</h3>
                        <div className="space-y-2">
                            {system.map((link) => (
                                <NavLink
                                to={link.href}
                                key={link.name}
                                className={({ isActive }) => `flex items-start justify-start text-left transition-all duration-300 transform cursor-pointer
                                gap-3 px-4 py-2 text-nowrap text-sm
                                ${isActive
                                    ? "text-black font-medium bg-gray-100"
                                    : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                                }`
                                }
                                >
                                    {link.icon}
                                    <span className="transition-all duration-300 ease-in-out">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>
                </div>
                
                <div className="border-t border-gray-100 py-3">
                    <div className="flex items-center gap-0.5 p-2.5 rounded-xl bg-gray-50 
                    border border-gray-100 relative">
                        <div className="flex-1">
                            <p className="hidden text-sm font-700 text-gray-900 leading-tight tracking-tight font-semibold">
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 font-normal">
                                {role}
                            </p>
                        </div>
                        <button
                        onClick={handleLogout}
                        className="w-7 h-7 flex items-center justify-center rounded-lg 
                        bg-white border border-gray-200 text-gray-300 cursor-pointer
                        hover:bg-red-50 hover:border-red-200 hover:text-red-400 
                        transition-all duration-300 shrink-0"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>

            </aside>

    )
}