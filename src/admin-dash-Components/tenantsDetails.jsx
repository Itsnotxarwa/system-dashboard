import { MoveLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

export default function TenantsDetails() {
    const {id} = useParams();
    
    const [ tenant, setTenant ] = useState(null)
    const [showAgentModal, setShowAgentModal] = useState(false);
    const TABS = ["Agents", "Call Records"];
    const [activeTab, setActiveTab] = useState(TABS[0])

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
    return(
        <div>
            <div className="max-w-6xl mx-auto p-8">
                
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
                        <div
                        className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">
                                {tenant.name}
                            </h1>
                            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full 
                            inline-flex items-center gap-1.5">
                                {tenant.status}
                            </span>
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
                    border border-[#032ca6] shadow-[0_4px_14px_rgba(3,44,166,0.25)]"
                    onClick={() => {
                        setShowAgentModal(true)
                    }}></button>
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
                        <div></div>
                    )}
                    {activeTab === "Call Records" && (
                        <div></div>
                    )}
                </div>
            </div>

            {showAgentModal && (
            <AgentModal
            onClose={() => setShowAgentModal(false)} 
            onCancel={() => setShowAgentModal(false)}
            />
            )}
        </div>
    )
}