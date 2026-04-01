import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import AgentsList from "../agents-components/AgentsList";
import AgentModal from "../agents-components/AgentModal";
import TopBar from "./TopBar";

export default function Agents() {
    const {id} = useParams();

    const [tenant, setTenant] = useState(null);
    const [agents, setAgents] = useState([]);
    const [showAgentModal, setShowAgentModal] = useState(false);

    useEffect(() => {
        const fetchTenant = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch(`https://api.voixup.fr/admin/tenants/${id}`,{
                headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setTenant(data);
        }
        fetchTenant();
    }, [id]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
            const token = localStorage.getItem("token");

        const res = await fetch(
            `https://api.voixup.fr/admin/tenants/${id}/agents`,
            {
                headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
                },
            }
        );

            const data = await res.json();
            console.log(data)

            setAgents(data);

            } catch (err) {
            console.error(err);
            }
        };

        fetchAgents();
    },[id]);

    const totalAgents = agents?.length || 0;
    const activeAgents = agents?.filter(
        (a) => a.is_active === true
    ).length || 0;
    const inactiveAgents = totalAgents - activeAgents;
    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1 flex flex-col">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} setShowAgentModal={setShowAgentModal} />

                <div className="flex items-center gap-4 py-6 px-4 card-anim">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
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

                <AgentsList agents={agents} setShowAgentModal={setShowAgentModal} />
            </main>

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