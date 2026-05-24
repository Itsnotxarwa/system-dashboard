import { useState } from "react";
import { Search } from "lucide-react";
import EditModal from "./tenants-components/EditModal";
import DeleteModal from "./tenants-components/DeleteModal";
import TenantsTable from "./tenants-components/TenantsTable";
import { handleUnauthorized } from "../utils/auth";

export default function Tenants({tenants, setTenants}) {
    const [search, setSearch] = useState("");    
    const [filter, setFilter] = useState("All");
    
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const handleEdit = (tenant) => {
        setSelectedTenant(tenant);
        setShowEditModal(true);
    };
    const handleDelete = (tenant) => {
        setSelectedTenant(tenant);
        setShowDeleteModal(true);
    };

    const filteredTenants = tenants.filter(t => 
        (t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())) &&
        (filter === "All" || (filter === "Active" && t.is_active) || (filter === "Inactive" && !t.is_active))
    );

    
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

            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (!response.ok) throw new Error("Reset failed");

            const data = await response.json();
            console.log(data);
            setTenants(prev => prev.map(t => t.id === tenantId ? {...t, password: newPassword} : t)); // add this

            setShowEditModal(false);


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

            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (!response.ok) throw new Error("Delete failed");
            
            setTenants(prev => prev.filter(t => t.id !== tenantId));
            const data = await response.json();
            console.log(data);

            } catch (error) {
                console.error(error);
            }
        }

    return (
    <div className="p-4">
        {/* SEARCH & TABS */}
        <div className="flex gap-2 items-center justify-start flex-wrap mb-4">
            <div className="flex items-center gap-2 pb-4 bg-[#161b22] 
            border border-[#30363d] rounded-[10px] py-2 px-3.5 w-80">
                <Search size={14} color="#8b949e" />
                <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher des locataires par nom ou ID de compte"
                className="w-full rounded-md pl-9 pr-3 py-2 
                text-[12.5px] text-[#e6edf3] font-mono transition-colors"
                style={{fontFamily: "'IBM Plex Mono', 'monospace'",}}
                />
            </div>
        {/* TABS */}
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
        <p className="text-[12.5px] text-[#8b949e] mb-3">
            Click a tenant to view its agents and call records
        </p>
        <TenantsTable 
        filteredTenants={filteredTenants} 
        setSelectedTenant={selectedTenant}
        handleEdit={handleEdit}
        handleDelete={handleDelete} />

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