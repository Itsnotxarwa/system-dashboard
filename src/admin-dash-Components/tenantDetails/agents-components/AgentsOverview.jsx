import { useState } from "react";
import Logo from "../../assets/image.png"
import AgentsList from "./AgentsList";
import AgentDetails from "./AgentDetails";
import DeleteAgent from "./DeleteAgent";
import EditModal from "./EditModal";
import { handleUnauthorized } from "../../../utils/auth";

export default function AgentsOverview({tenant, agents, setAgents, typeFilter, setTypeFilter}) {
    const totalAgents = agents?.length || 0;
    const activeAgents = agents?.filter(
        (a) => a.is_active === true
    ).length || 0;
    const inactiveAgents = totalAgents - activeAgents;
    const [showAgentDetails, setShowAgentDetails] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteAgent, setShowDeleteAgent] = useState(false);

    const deleteAgent = async (AgentId) => {
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`
                https://api.voixup.fr/admin/agents/${AgentId}`,
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
        setAgents(prev => prev.filter(t => t.id !== AgentId))

        const data = await response.json();
        console.log(data);

        } catch (err) {
            console.log(`Failed: ${err?.detail}`)
        }
    }

    const handleEdit = (agent) => {
        setSelectedAgent(agent);
        setShowEditModal(true);
    };
    const handleDelete = (agent) => {
        setSelectedAgent(agent);
        setShowDeleteAgent(true);
    };

    return(
        <div className="min-h-screen bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex">
            <div className="max-w-7xl mx-auto p-6 flex-1">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <img src={Logo} alt="Logo" className="w-14" />
                    <span className="text-xs text-slate-400 tracking-widest uppercase">
                        {tenant?.name}
                    </span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center 
                    justify-center text-white text-sm font-black shrink-0 
                    bg-linear-to-br from-[#0366a6] to-[#1e40af] 
                    shadow-[0_6px_18px_rgba(3,44,166,.22)]">
                        {tenant?.name ? tenant.name
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0,2)
                        .join("") 
                        : ""}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight" 
                            style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                                {tenant?.name || ""}
                            </h1>
                            <div className="flex items-center gap-1.5 ml-2">
                                <span className={`w-1.5 h-1.5 rounded-full
                                    ${tenant?.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#6b7280] shadow-[0_0_5px_#6b7280]"}`}></span>
                                <span className="text-[10px] text-slate-400">
                                    {tenant?.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-slate-400 font-mono">
                                {tenant?.id}
                            </span>
                            <span className="text-[10px] text-slate-400">
                                {tenant?.email}
                            </span>
                        </div>
                    </div>
                    {/* KPIs cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {/* Total */}
                        <div className="text-center px-4 py-3 rounded-xl bg-[rgba(3,44,166,.05)]
                        border border-[rgba(3,44,166,.09)]">
                            <div 
                            className="text-base font-black"
                            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", color: "#032ca6" }}>
                                {totalAgents}
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest">
                                Total
                            </div>
                        </div>

                        <div
                        className="text-center px-4 py-3 rounded-xl"
                        style={{
                            background: "rgba(5,150,105,.06)",
                            border: "1px solid rgba(5,150,105,.14)",
                        }}
                        >
                            <div
                            className="text-base font-black"
                            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", color: "#059669" }}
                            >
                                {activeAgents}
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest">
                                Active
                            </div>
                        </div>
                        
                        {/* Inactive */}
                        <div
                        className="text-center px-4 py-3 rounded-xl"
                        style={{
                            background: "rgba(124,58,237,.06)",
                            border: "1px solid rgba(124,58,237,.14)",
                        }}
                        >
                            <div
                            className="text-base font-black"
                            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", color: "#7c3aed" }}
                            >
                                {inactiveAgents}
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest">
                                Inactive
                            </div>
                        </div>
                    </div>                   
                </div>
                <div className="mb-6">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>Agents</h1>
                    <p className="text-[16px] text-slate-500 mt-0.5"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>Click any row to view full agent details</p>
                </div>
                <div className="mb-6 flex gap-1 p-1 rounded-xl bg-[rgba(3,44,166,.05)] border
                    border-[rgba(3,44,166,.10)]">
                    {["", "inbound", "outbound"].map((type) => (
                        <button 
                        key={type}                        
                        onClick={() => setTypeFilter(type)}
                        className={`px-3 py-1.5 text-xs transition-all rounded-xl ${
                        typeFilter === type
                            ? "bg-[#032ca6] text-white font-medium"
                            : "text-slate-500 hover:bg-white"
                        }`}
                        >
                            {type === "" ? "All" : type}
                        </button>
                    ))}
                </div>
                <AgentsList 
                agents={agents} 
                setSelectedAgent={setSelectedAgent} 
                setShowAgentDetails={setShowAgentDetails}
                typeFilter={typeFilter}  />
            </div>
            {showAgentDetails && (
                <AgentDetails 
                setShowDeleteAgent={setShowDeleteAgent}
                setShowEditModal={setShowEditModal}
                onClose={() => setShowAgentDetails(false)} 
                selectedAgent={selectedAgent}
                handleEdit={handleEdit}
                handleDelete={handleDelete} />
            )}
            {showEditModal && (
                <EditModal
                selectedAgent={selectedAgent}
                onClose={() => setShowEditModal(false)}
                onCancel={() => setShowEditModal(false)}
                setAgents={setAgents} />
            )}
            {showDeleteAgent && (
                <DeleteAgent
                selectedAgent={selectedAgent}
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