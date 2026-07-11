import { useState, useEffect } from "react";
import apiFetch from "../../shared/ApiFetch";
import { useParams } from "react-router-dom";
import TenantSidebar from "../tenantSidebar";
import TopBar from "../TopBar";
import { Phone, Edit, Trash } from "lucide-react";
import EditModal from "./EditModal";
import DeleteAgent from "./DeleteAgent";
import { useNavigate } from "react-router-dom";

export default function Agent() {
    const { id, agentId } = useParams();
    const navigate = useNavigate();

    const [agent, setAgent] = useState(null);
    const [tenant, setTenant] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteAgent, setShowDeleteAgent] = useState(false);

    {/* fetch Tenant */}
    useEffect(() => {
        const fetchTenant = async () => {
            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}`);
            if (!res) return;  
            const data = await res.json();
            setTenant(data);
        }   
        fetchTenant();
    }, [id]); 


    useEffect(() => {
        const fetchAgent = async () => {
            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}/agents/${agentId}`);
            if (!res) return;

            const data = await res.json();
            setAgent(data);
        };

        fetchAgent();
    }, [id, agentId]);

    const deleteAgent = async (AgentId) => {
        try{
            const response = await apiFetch(`https://api.mazia.ai/admin/agents/${AgentId}`,
            {
                method: "DELETE",
            }
        );

        if (!response) return;

        if (!response.ok) throw new Error("Delete failed");
        navigate(`/tenant/${id}/agents`);

        const data = await response.json();
        console.log(data);

        } catch (err) {
            console.log(`Failed: ${err?.detail}`)
        }
    }

    const handleEdit = () => {
        setShowEditModal(true);
    };
    const handleDelete = () => {
        setShowDeleteAgent(true);
    };

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-55">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} activeItem={agent?.name} />
                <div className="max-w-7xl mx-auto p-6 flex-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl flex items-center 
                        justify-center text-white text-sm font-black shrink-0 
                        bg-linear-to-br from-[#1c50a0] to-[#58a6ff] 
                        shadow-[0_6px_18px_rgba(3,44,166,.22)]">
                            {agent?.name ? agent.name
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase())
                            .slice(0,2)
                            .join("") 
                            : ""}
                            </div>
                    
                            <div className="flex-1">
                                {/* Name + Status */}
                                <div className="flex items-center gap-3">
                                <h1 className="text-xl font-black text-white tracking-tight" 
                            style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                                {agent?.name || ""}
                                </h1>
                                <div className="flex items-center justify-center gap-1.5 ml-2">
                                <span className={`w-1.5 h-1.5 rounded-full
                                    ${agent?.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#6b7280] shadow-[0_0_5px_#6b7280]"}`}></span>
                                <span className="text-[10px] text-slate-400">
                                    {agent?.is_active ? "Active" : "Inactive"}
                                </span>
                                </div>
                                </div>
                                {/* Type / Number / Id */}
                                <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] text-slate-400 font-mono">
                                    <Phone size={12} />
                                    {agent?.type || ''}
                                </span>
                                <div className="h-4 w-px bg-[#30363d]" />
                                <span className="text-[10px] text-slate-400 font-mono">
                                    <Phone size={12} />
                                    {agent?.sip_number || ''}
                                </span>
                                <div className="h-4 w-px bg-[#30363d]" />
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {agent?.id || ''}
                                </span>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center justify-end gap-2 pb-1">
                            <button
                            onClick={handleEdit}
                            className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-semibold
                            transition-all flex items-center gap-1.5 font-mono
                            text-[#58a6ff] bg-[rgba(88,166,255,.08)] border border-[rgba(88,166,255,.25)]
                            hover:bg-[rgba(88,166,255,.15)]">
                                <Edit size={12} />
                                Edit
                            </button>
                            <button
                            onClick={handleDelete}
                            className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-semibold transition-all
                            flex items-center gap-1.5 font-mono
                            border border-[rgba(248,81,73,.25)] bg-[rgba(248,81,73,.08)]
                            text-[#f85149] hover:bg-[rgba(248,81,73,.15)]">
                                <Trash size={12} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {showEditModal && (
                <EditModal
                selectedAgent={agent}
                onClose={() => setShowEditModal(false)}
                onCancel={() => setShowEditModal(false)}
                onUpdated={(updatedAgent) => {
                    setAgent(updatedAgent);
                }} />
            )}
            {showDeleteAgent && (
                <DeleteAgent
                selectedAgent={agent}
                onCancel={() => setShowDeleteAgent(false)}
                onConfirm={(id) => {
                deleteAgent(id);
                setShowDeleteAgent(false);
                }} 
                />
            )}
        </div>
    )
}