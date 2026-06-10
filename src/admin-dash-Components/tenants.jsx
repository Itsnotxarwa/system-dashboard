import { useState } from "react";
import EditModal from "./tenants-components/EditModal";
import DeleteModal from "./tenants-components/DeleteModal";
import TenantsTable from "./tenants-components/TenantsTable";
import apiFetch from "./shared/ApiFetch";

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
            
            const response = await apiFetch(
                `https://api.mazia.ai/admin/tenants/${tenantId}/reset-password`,{
                    method: "PATCH",
                    body: JSON.stringify({ new_password: newPassword }),
                }
            );

            if (!response) return;

            const data = await response.json();

            if (!response.ok) {
                alert(data?.detail || "Reset failed");
                return;
            }

            setTenants(prev => prev.map(t => t.id === tenantId ? {...t, password: newPassword} : t)); // add this
            setShowEditModal(false);

            } catch (error) {
                alert("Network error, check your connection");
                console.error(error);
            }
    };

    {/* DELETE TENANTS */}
    const deleteTenant = async (tenantId) => {
            try{
                const response = await apiFetch(
                    `https://api.mazia.ai/admin/tenants/${tenantId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response) return;

            if (!response.ok) {
                const data = await response.json();
                alert(data?.detail || "Failed to delete tenant");
                return;
            }
            
            if (response.status !== 204) {
            const data = await response.json();
            console.log("Delete response:", data);
            }

            setTenants(prev => prev.filter(t => t.id !== tenantId));

            } catch (error) {
                alert("Network error, check your connection");
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
    <div>
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