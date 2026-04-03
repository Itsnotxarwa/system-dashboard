import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import AgentsList from "../agents-components/AgentsList";
import AgentModal from "../agents-components/AgentModal";
import TopBar from "./TopBar";
import AgentsOverview from "../agents-components/AgentsOverview";

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
        if (res.status === 404) {
            setAgents([]);
            return;
        }
            const data = await res.json();
            console.log(data)

            setAgents(data);

            } catch (err) {
            console.error(err);
            setAgents([]);
            }
        };

        fetchAgents();
    },[id]);

    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1 flex flex-col">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} setShowAgentModal={setShowAgentModal} />

                <AgentsOverview tenant={tenant} agents={agents} />

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