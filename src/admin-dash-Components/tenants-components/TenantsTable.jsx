import { useNavigate } from "react-router-dom";
import { Edit, Trash, Search } from "lucide-react";

export default function TenantsTable({filteredTenants, handleEdit, handleDelete, search, setSearch}) {
    const navigate = useNavigate();
    
    return(
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden flex-1 min-w-0">
            {/* Head: Search bar and number of tenants */}
            <div className="px-5 py-4 border-b border-[#21262d] flex items-center gap-2">
                {/* SEARCH  */}
                <div className="relative">
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tenants..."
                        className="bg-[#0d1117] border border-[#30363d] rounded-md pl-8 pr-3 py-1.5
                        text-[12px] text-[#e6edf3] placeholder-[#8b949e] font-mono outline-none
                        focus:border-[#58a6ff] transition-colors w-52"
                    />
                </div>
                <span className="ml-auto text-[13px] text-[#8b949e] font-mono">{filteredTenants.length} tenants</span>
            </div>

            {/* Table of tenants */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#21262d]">
                        {["Nom", "ID du Compte", "Statut", "Email", "Téléphone", "Créé le", ""].map((item) => (
                            <th className="text-left px-5 py-3 text-xs font-medium tracking-widest 
                        uppercase text-[#8b949e]">
                                {item}
                            </th>
                        ))}
                    </tr>   
                </thead>
                <tbody>
                    {filteredTenants.map((t) => (
                    <tr 
                    key={t.id} 
                    onClick={() => {
                        navigate(`/tenant/${t.id}/agents`)
                    }}
                    className="hover:bg-[rgba(255,255,255,.03)] border-b border-[#21262d] cursor-pointer transition-colors">
                        <td className="px-5 py-4 flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white 
                            text-[11px] font-bold shrink-0 bg-linear-to-br from-[#1c50a0] to-[#3b6fbf]"
                            style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                                {t?.name ? t.name
                                .split(" ")
                                .map(word => word.charAt(0).toUpperCase())
                                .slice(0,2)
                                .join("") 
                                : ""}
                            </div>
                            {t.name}
                        </td>
                        <td className="px-4 py-4 text-[#8b949e] text-xs"
                        style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                            {t.id}
                        </td> 
                        <td className="px-4 py-4">
                            <div className="flex justify-center items-center">
                                <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                                    ${t.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                    <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                        ${t.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#d1d5db]"}`}>
                                    </span>
                                    {t.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-[#8b949e] text-[16px]">{t.email}</td>
                        <td className="px-4 py-4 text-[#8b949e] text-[16px]"
                        style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                            {t.phone}
                        </td>
                        <td className="px-4 py-4 text-[#8b949e] text-[16px]"
                        style={{fontFamily: "'IBM Plex Mono', 'monospace'"}}>
                            {new Date(t.created_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-4 py-4 items-center gap-2 justify-end">
                            <button className="text-[#58a6ff] hover:opacity-70 transition-opacity cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(t)
                            }}>
                                <Edit size={21} />
                            </button>
                            <button 
                            className="hover:opacity-70 transition-opacity cursor-pointer text-[#f85149]"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(t)
                            }}>
                                <Trash size={21} />
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}