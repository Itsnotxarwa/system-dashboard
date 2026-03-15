import { NavLink } from "react-router-dom";
import { Building, Settings, Phone, KeyRound, ChartColumn } from "lucide-react";
import Logo from "../assets/image.png";
import Logo2 from "../assets/image_logo.png";


export default function Sidebar() {

    const main = [
        { name: "tenants", label: "Tenants", href: "/", icon: <Building size={20} /> },
        { name: "configs", label: "Configs", href: "/configs", icon: <Settings size={20} /> },
        { name: "sessions", label: "Sessions", href:"/sessions", icon: <Phone size={20} /> },
    ];

    const system = [
        { name: "apikeys", label: "API Keys", href: "/api-keys", icon: <KeyRound size={20} /> },
        { name: "analytics", label: "Analytics", href: "/analytics", icon: <ChartColumn size={20} /> },
    ];


    return(
            <aside className="flex flex-col w-18 md:w-21 lg:w-55 px-4 md:px-6 h-screen
            py-8 transition-all duration-300 ease-in-out">
                <div className="hidden lg:flex items-center justify-start">
                    <img src={Logo} alt="Mazia" className="w-30" />
                </div>

                <div className="flex lg:hidden items-center justify-center">
                    <img src={Logo2} alt="Mazia" className="w-12 md:w-18" />
                </div>
                
                <nav className="space-y-8 mt-12">
                    <div className="space-y-2">
                        <h3 className="uppercase text-xs font-semibold text-gray-500 tracking-wider">Main</h3>
                        <div className="space-y-2">
                            {main.map((link) => (
                                <NavLink
                                to={link.href}
                                key={link.name}
                                className={({ isActive }) => `flex items-center lg:items-start justify-center
                                lg:justify-start text-left transition-all duration-300 transform cursor-pointer
                                gap-3 px-2 lg:px-4 py-2 text-nowrap text-sm
                                ${isActive
                                    ? "text-black font-medium bg-gray-100"
                                    : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                                }`
                                }
                                >
                                    {link.icon}
                                    <span className="transition-all duration-300 ease-in-out hidden lg:block">{link.label}</span>
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
                                className={({ isActive }) => `flex items-center lg:items-start justify-center
                                lg:justify-start text-left transition-all duration-300 transform cursor-pointer
                                gap-3 px-2 lg:px-4 py-2 text-nowrap text-sm
                                ${isActive
                                    ? "text-black font-medium bg-gray-100"
                                    : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                                }`
                                }
                                >
                                    {link.icon}
                                    <span className="transition-all duration-300 ease-in-out hidden lg:block">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>
                
            </aside>

    )
}