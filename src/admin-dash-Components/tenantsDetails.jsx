import { MoveLeft, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AgentModal from "./agents-components/AgentModal";
import AgentsList from "./agents-components/AgentsList";

export default function TenantsDetails() {
    const {id} = useParams();
    
    const [ tenant, setTenant ] = useState(null)
    const [showAgentModal, setShowAgentModal] = useState(false);
    const TABS = ["Agents", "Call Records"];
    const [activeTab, setActiveTab] = useState(TABS[0])
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchTenant = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch(`https://api.voixup.fr/admin/tenants/${id}`,{
                headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
                },
            });
            
            const data = await res.json();
            setTenant(data);
        };

        fetchTenant();
    }, [id]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
            const token = localStorage.getItem("token");

        const res = await fetch(
            `https://api.voixup.fr/admin/agents?tenant_id=${id}`,
            {
                headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
                },
            }
        );

            const data = await res.json();

            console.log("agents:", data);

            setAgents(data); 
            } catch (err) {
            console.error(err);
            }
        };

        fetchAgents();
    },[id]);


    return(
        <div>
            <div className="max-w-7xl mx-auto p-8">
                
                {/* bBACK TO TENANTS */}
                <a 
                href="/"
                className="flex items-center gap-2 text-xs text-slate-400 
                hover:text-slate-700 transition-colors mb-6 group">
                    <MoveLeft />
                    Back to tenants
                </a>
                
                {/* TENANT INFO */}
                <div className="flex items-start justify-between mb-6">
                    {tenant && (
                        <div>
                            <div
                            className="flex items-center gap-3">
                                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                                    {tenant.name}
                                </h1>
                                <span
                                style={{
                                    padding: "4px 12px",
                                    borderRadius: 20,
                                    fontSize: 11,   
                                    fontWeight: 500,
                                    color: tenant.is_active ? "#059669" : "#6b7280",
                                    background: tenant.is_active ? "rgba(5,150,105,0.1)" : "rgba(107,114,128,0.1)",
                                    border: tenant.is_active ? "1px solid rgba(5,150,105,0.2)" : "1px solid rgba(107,114,128,0.2)",
                                    display: "inline-block",
                                }}>
                                    {tenant.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1 font-mono">
                                {tenant.id}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                                {tenant.email}
                            </div>
                        </div>
                    )}
                    <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                    text-xs font-bold text-white transition-all bg-[#032ca6]
                    border border-[#032ca6] shadow-[0_4px_14px_rgba(3,44,166,0.25)] cursor-pointer"
                    onClick={() => {
                        setShowAgentModal(true)
                    }}>
                        <Plus />
                        Add Agent
                    </button>
                </div>
                
                {/* TABS: AGENTS/CALLS */}
                <div className="flex border-b shrink-0 px-6 border border-[rgba(3,44,166,0.08)]">
                    {TABS.map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: "9px 18px",
                            fontSize: 12,
                            fontFamily: "'DM Mono', monospace",
                            fontWeight: activeTab === tab ? 600 : 400,
                            background: "none",
                            border: "none",
                            borderBottom: activeTab === tab ? "2px solid #032ca6" : "2px solid transparent",
                            color: activeTab === tab ? "#032ca6" : "#9aabca",
                            cursor: "pointer",
                            marginBottom: -1,
                            transition: "all 0.15s",
                        }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex-1 px-6 py-5 overflow-y-auto">
                    {activeTab === "Agents" && (
                        <AgentsList agents={agents} />
                    )}
                    {activeTab === "Call Records" && (
                        <div></div>
                    )}
                </div>
            </div>

            {showAgentModal && (
            <AgentModal
            selectedTenant={tenant}
            onClose={() => setShowAgentModal(false)} 
            onCancel={() => setShowAgentModal(false)}
            />
            )}
        </div>
    )
}