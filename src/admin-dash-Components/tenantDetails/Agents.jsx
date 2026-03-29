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
    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-gray-50 flex-1 flex flex-col">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} setShowAgentModal={setShowAgentModal} />

                <div className="flex items-center gap-4 mb-6 card-anim">
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