import { useState } from "react";
import EditModal from "./tenants-components/EditModal";
import DeleteModal from "./tenants-components/DeleteModal";
import TenantsTable from "./tenants-components/TenantsTable";
import { handleUnauthorized } from "../utils/auth";

export default function Tenants({tenants, setTenants, loading}) {
    const [search, setSearch] = useState("");    
    
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
        (t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()))
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

        if (loading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                    viewBox="25 25 50 50">
                        <circle
                        className="loading-circle" 
                        r="20" cy="50" cx="50"></circle>
                    </svg>
                </div>
            )
        }

    return (
    <div className="p-4">
        <p className="text-[12.5px] text-[#8b949e] mb-3">
            Click a tenant to view its agents and call records
        </p>
        <TenantsTable 
        search={search}
        setSearch={setSearch}
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