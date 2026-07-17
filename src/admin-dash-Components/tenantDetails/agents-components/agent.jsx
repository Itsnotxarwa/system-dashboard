import { useState, useEffect } from "react";
import apiFetch from "../../shared/ApiFetch";
import { useParams } from "react-router-dom";
import TenantSidebar from "../tenantSidebar";
import TopBar from "../TopBar";
import { Phone, Edit, Trash, Save, Loader2 } from "lucide-react";
import DeleteAgent from "./DeleteAgent";
import { useNavigate } from "react-router-dom";
import ConfigPanel from "./agent-components/ConfigPanel";
import Loading from "../../shared/Loading";

export default function Agent() {
    const { id, agentId } = useParams();
    const navigate = useNavigate();

    const [agent, setAgent] = useState(null);
    const [tenant, setTenant] = useState(null);

    const [showDeleteAgent, setShowDeleteAgent] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false); 


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
            try {
                setLoading(true);
                const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}/agents/${agentId}`);
                if (!res) return;
                
                const data = await res.json();
                setAgent(data);
        } finally {
            setLoading(false);
        }

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

    const handleDelete = () => {
        setShowDeleteAgent(true);
    };

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (agent) {
            setForm({
                ...agent,
                tools: agent.tools || [],
                voicemail: agent.voicemail || {
                    leave_message: false,
                    message: "",
                },
            })
        }
    }, [agent]); 

    const handleModelChange = (model, key, value) => {
        setForm((prev) => ({
            ...prev,
            models_config: { ...(prev.models_config || {}), [model]: { ...(prev.models_config?.[model] || {}), [key]: value } }
        }));
    };

    if (!form) return null;

    const addTool = () => {
        setForm(prev => ({ ...prev, tools: [...(prev.tools || []), { name: "", url: "", provider: "custom", is_enabled: true }] }));
    };

    const updateTool = (index, key, value) => {
        const updated = [...form.tools];
        updated[index][key] = value;
        setForm(prev => ({ ...prev, tools: updated }));
    };

    const removeTool = (index) => {
        setForm(prev => ({ ...prev, tools: prev.tools.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async () => {
        try {
            setSaving(true);
            const payload = {
                name: form.name, sip_number: form.sip_number, system_prompt: form.system_prompt,
                greeting_message: form.greeting_message, end_call_message: form.end_call_message || "",
                is_active: form.is_active, tools: form.tools || [], models_config: form.models_config,
                voicemail: form.voicemail || { leave_message: false, message: "" }
            };
            const res = await apiFetch(`https://api.mazia.ai/admin/agents/${form.id}/config`, {
                method: "PUT",
                body: JSON.stringify(payload),
            });
            if (!res) return;

            const data = await res.json();
            if (!res.ok) throw new Error(data?.detail || "Update failed");

            const refreshed = await apiFetch(
                `https://api.mazia.ai/admin/tenants/${id}/agents/${agentId}`
            );

            if (!refreshed) return;

            const updated = await refreshed.json(); 

            setAgent(updated);
            setIsEditing(false);
        } catch (err) {
            console.error(`Failed: ${err?.detail}`);
        } finally {
            setSaving(false);
        }
    };

    const handleEditClick = async () => {
        if (isEditing) {
            await handleSubmit();
        } else {
            setIsEditing(true);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} label="Agents" />
            <main className="bg-[#0d1117] flex-1 ml-55">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} activeItem={agent?.name} showAddAgent={false} />
                <div className="max-w-7xl mx-auto p-6 flex-1 bg-[#0d1117]">
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
                                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                                    <Phone size={12} />
                                    {agent?.type || ''}
                                </span>
                                <div className="h-4 w-px bg-[#30363d]" />
                                <span className="text-[10px] text-slate-400 font-mono">
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
                            onClick={handleEditClick}
                            disabled={saving}
                            className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-semibold
                            transition-all flex items-center gap-1.5 font-mono disabled:opacity-50
                            disabled:cursor-not-allowed
                            text-[#58a6ff] bg-[rgba(88,166,255,.08)] border border-[rgba(88,166,255,.25)]
                            hover:bg-[rgba(88,166,255,.15)]">
                                {saving ? <Loader2 size={12} className="animate-spin" /> : isEditing ? <Save size={12} /> : <Edit size={12} />}
                                {saving ? "Saving ..." : isEditing ? "Save" : "Edit"}
                            </button>
                            <button
                            onClick={handleDelete}
                            disabled={saving}
                            className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-semibold transition-all
                            flex items-center gap-1.5 font-mono
                            border border-[rgba(248,81,73,.25)] bg-[rgba(248,81,73,.08)]
                            text-[#f85149] hover:bg-[rgba(248,81,73,.15)]">
                                <Trash size={12} />
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="py-4">
                        <ConfigPanel 
                        agent={agent}
                        isEditing={isEditing}
                        form={form}
                        setForm={setForm}
                        handleModelChange={handleModelChange}
                        updateTool={updateTool}
                        addTool={addTool}
                        removeTool={removeTool}
                        />
                    </div>
                </div>
            </main>


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