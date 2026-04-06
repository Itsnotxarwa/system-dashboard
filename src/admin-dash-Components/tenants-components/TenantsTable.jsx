import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

export default function TenantsTable({filteredTenants, handleEdit, handleDelete}) {
    const navigate = useNavigate();
    
    return(
        <div className="bg-white rounded-2xl overflow-hidden mb-6 border border-[rgba(3,44,166,.09)] 
        shadow-[0_2px_12px_rgba(3,44,166,.06)]">
            <table className="w-full border-collapse">
                <thead className="bg-[rgba(3,44,166,.025)] border-b border-[rgba(3,44,166,.07)]">
                    <tr>
                        <th className="text-left p-[13px_20px] text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">   
                            Nom
                        </th>
                        <th className="text-left p-[13px_20px] text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            ID du compte
                        </th>
                        <th className="text-left p-[13px_20px] text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Statut
                        </th>
                        <th className="text-left p-[13px_20px] text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Email
                        </th>
                        <th className="text-left p-[13px_20px] text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Téléphone
                        </th>
                        <th className="text-left p-[13px_20px] text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Créé le
                        </th>
                        <th></th>
                    </tr>   
                </thead>
                <tbody>
                    {filteredTenants.map((t) => (
                    <tr 
                    key={t.id} 
                    onClick={() => {
                        navigate(`/tenant/${t.id}/agents`)
                    }}
                    className="border-t border-[rgba(3,44,166,0.06)] hover:bg-[rgba(3,44,166,.02)]
                    cursor-pointer">
                        <td className="p-[13px_20px] flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white 
                            text-[11px] font-black shrink-0 bg-linear-to-br from-[#0366a6] to-[#1e40af] 
                            shadow-[0_6px_18px_rgba(3,44,166,.22)]">
                                {t?.name ? t.name
                                .split(" ")
                                .map(word => word.charAt(0).toUpperCase())
                                .slice(0,2)
                                .join("") 
                                : ""}
                            </div>
                            {t.name}
                        </td>
                        <td className="p-[13px_20px]">{t.id}</td> 
                        <td className="p-[13px_20px]">
                            <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                                ${t.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                    ${t.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#d1d5db]"}`}>
                                </span>
                                {t.is_active ? "Active" : "Inactive"}
                            </span>
                        </td>
                        <td className="p-[13px_20px]">{t.email}</td>
                        <td className="p-[13px_20px]">{t.phone}</td>
                        <td className="p-[13px_20px]">
                            {new Date(t.created_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="p-[13px_20px] flex gap-2">
                            <button className="bg-[rgba(3,44,166,.06)] text-[#032ca6] border border-[rgba(3,44,166,.14)]
                            cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(t)
                            }}>
                                <Edit size={21} />
                            </button>
                            <button 
                            className="bg-[rgba(220,38,38,.06)] text-[#dc2626] border border-[rgba(220,38,38,.16)]
                            cursor-pointer"
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