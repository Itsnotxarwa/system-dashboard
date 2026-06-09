import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import AgentModal from "./agents-components/AgentModal";
import TopBar from "./TopBar";
import AgentsOverview from "./agents-components/AgentsOverview";
import { handleUnauthorized } from "../../utils/auth";

export default function Agents() {
    const {id} = useParams();

    const [tenant, setTenant] = useState(null);
    const [agents, setAgents] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [typeFilter, setTypeFilter] = useState("");

    {/* fetch Tenant */}
    useEffect(() => {
        const fetchTenant = async () => {

            const res = await fetch(`https://api.mazia.ai/admin/tenants/${id}`,{
                headers: {
                accept: "application/json",
                },
                credentials: "include",
            });

            if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }

            const data = await res.json();
            setTenant(data);
        }
        fetchTenant();
    }, [id]);

    {/* fetch Agents */}
    useEffect(() => {
        const fetchAgents = async () => {
            try {
            setLoading(true);
            const params = new URLSearchParams();

            if (typeFilter) params.append("type", typeFilter);

            const url = `https://api.mazia.ai/admin/tenants/${id}/agents${
                params.toString() ? `?${params.toString()}` : ""
            }`;

        const res = await fetch(
            url,
            {
                headers: {
                accept: "application/json",
                },
                credentials: "include",
            }
        );

        if (res.status === 401) {
            handleUnauthorized(401);
            return;
        }

        if (res.status === 404) {
            setAgents([]);
            return;
        }
            const data = await res.json();
            console.log(data)

            setAgents(data.agents);
            setTotal(data.total);

            } catch (err) {
            console.error(err);
            setAgents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    },[id, typeFilter]);

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 flex flex-col ml-55">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} setShowAgentModal={setShowAgentModal} />
                <AgentsOverview 
                tenant={tenant} 
                agents={agents} 
                total={total}
                setAgents={setAgents}
                setShowAgentModal={setShowAgentModal}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                loading={loading}
                />
            </main>

            {showAgentModal && (
                <AgentModal 
                selectedTenant={tenant}
                setAgents={setAgents}
                onClose={() => setShowAgentModal(false)} 
                onCancel={() => setShowAgentModal(false)}
                />
            )}

        </div>
    )
}