import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleX, Edit, Search } from "lucide-react";
import EditModal from "./tenants-components/EditModal";
import DeleteModal from "./tenants-components/DeleteModal";
import AgentModal from "./agents-components/AgentModal";

export default function Tenants() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");    
    const [filter, setFilter] = useState("All");
    const [tenants, setTenants] = useState([]);
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    

    const handleEdit = (tenant) => {
        setSelectedTenant(tenant);
        setShowEditModal(true);
    };


    const filteredTenants = tenants.filter(t => 
        (t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())) &&
        (filter === "All" || (filter === "Active" && t.is_active) || (filter === "Inactive" && !t.is_active))
    );


    {/* GET TENANTS */}
    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const token = localStorage.getItem("token");
                
                const response = await fetch("https://api.voixup.fr/admin/tenants", {
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                const data = await response.json();
                console.log(data);
                
                setTenants(data); 
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchTenants();
    }, []);
    
    {/* UPDATE TENANT */}
    const resetPassword = async (tenantId, newPassword) => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch(`
                https://api.voixup.fr/admin/tenants/${tenantId}/reset-password?new_password=${newPassword}
                `,{
                    method: "PATCH",
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Reset failed");

            const data = await response.json();
            console.log(data);
            alert("Password updated ✅");

            setShowEditModal(false);

            window.location.reload();

            } catch (error) {
                console.error(error);
            }
        };

        {/* DELETE TENANTS */}
        const deleteTenant = async (tenantId) => {
            try{
                const token = localStorage.getItem("token");
                const response = await fetch(`
                    https://api.voixup.fr/admin/tenants/${tenantId}`,
                {
                    method: "DELETE",
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Delete failed");

            const data = await response.json();
            console.log(data);

            setTenants(prev => prev.filter(t => t.id !== tenantId));
            } catch (error) {
                console.error(error);
            }
        }

    return (
    <div className="p-4">
        <div className="flex tenant-title justify-start items-start gap-2 mt-4">
            <h1 className=" mb-4 text-[17px] font-bold tracking-[-0.03em]">
                All Tenants
            </h1>
            <p className="text-[11px] font-semibold bg-[rgba(3,44,166,0.08)] border border-[rgba(3,44,166,0.14)]
            text-[#032ca6] py-1 px-2 tracking-[-0.02em] rounded-[20px]">
                {tenants.length} tenants
            </p>
        </div>
        <div className="flex gap-2 items-center justify-start flex-wrap mb-4">
        <div className="flex items-center gap-2 pb-4 bg-[rgba(3,44,166,0.04)] border
        border-[rgba(3,44,166,0.14)] rounded-[10px] py-2 px-3.5 w-80">
            <Search size={14} color="#9aabca" />
            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher des locataires par nom ou ID de compte"
            className="text"
            style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 12,
                color: "#0a1628",
                fontFamily: "'DM Mono', monospace",
                width: "100%",
            }}
            />
        </div>
        {["All", "Active", "Inactive"].map((f) => {
          const active = filter === f;
          const accentMap = {
            All: { bg: "#032ca6", txt: "white", border: "#032ca6" },
            Active: { bg: "#059669", txt: "white", border: "#059669" },
            Inactive: { bg: "#6b7280", txt: "white", border: "#6b7280" },
          };
            return (
              <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    border: active
                      ? `1px solid ${accentMap[f].border}`
                      : "1px solid rgba(3,44,166,0.12)",
                    background: active
                      ? accentMap[f].bg
                      : "rgba(3,44,166,0.03)",
                    color: active ? accentMap[f].txt : "#7a8bb5",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {f !== "All" && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: active
                          ? "rgba(255,255,255,0.7)"
                          : f === "Active"
                          ? "#22c55e"
                          : "#d1d5db",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {f}
                </button>
              );
            })}
        </div>
        <p className="text-xs text-slate-400 mt-1">
            Click a tenant to view its agents and call records
        </p>
        <div className="py-2">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-left text-[11px] font-semibold text-[#7a8bb5] border-b border-[#e5e7eb]"></tr>
                    <tr className="text-left text-[11px] font-semibold text-[#7a8bb5] border-b border-[#e5e7eb]">
                        <th className="py-2">Nom</th>
                        <th className="py-2">ID du compte</th>
                        <th className="py-2">Statut</th>
                        <th className="py-2">Téléphone</th>
                        <th className="py-2">Créé le</th>
                        <th></th>
                    </tr>   
                </thead>
                <tbody>
                    {filteredTenants.map((t) => (
                    <tr 
                    key={t.id} 
                    className="border-b border-[#e5e7eb] hover:bg-[rgba(3,44,166,0.02)] hover:cursor-pointer"
                    onClick={() => {
                        navigate(`/tenants/${t.id}`)
                    }}>
                        <td className="py-2">{t.name}</td>
                        <td className="py-2">{t.id}</td> 
                        <td className="py-2">
                            <span
                                style={{
                                    padding: "4px 12px",
                                    borderRadius: 20,
                                    fontSize: 11,   
                                    fontWeight: 500,
                                    color: t.is_active ? "#059669" : "#6b7280",
                                    background: t.is_active ? "rgba(5,150,105,0.1)" : "rgba(107,114,128,0.1)",
                                    border: t.is_active ? "1px solid rgba(5,150,105,0.2)" : "1px solid rgba(107,114,128,0.2)",
                                    display: "inline-block",
                                }}
                            >
                                {t.is_active ? "Active" : "Inactive"}
                            </span>
                        </td>
                        <td className="py-2">{t.phone}</td>
                        <td className="py-2">
                            {new Date(t.created_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="py-2 flex gap-2">
                            <button className="flex items-center justify-center text-gray-500
                            cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(t)
                            }}>
                                <Edit size={21} />
                            </button>
                            <button 
                            className="flex items-center justify-center text-red-500
                            cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTenant(t);
                            }}>
                                <CircleX size={21} />
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {showEditModal && (
            <EditModal 
            selectedTenant={selectedTenant} 
            setSelectedTenant={setSelectedTenant} 
            resetPassword={resetPassword} 
            setShowEditModal={setShowEditModal}
            />
        )}

        {showDeleteModal && (
            <DeleteModal 
            selectedTenant={selectedTenant}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={(id) => {
                deleteTenant(id);
                setShowDeleteModal(false);
            }} />
        )}
    </div>
)
}