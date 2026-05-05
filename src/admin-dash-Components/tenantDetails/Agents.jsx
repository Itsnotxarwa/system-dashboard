import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import AgentModal from "../agents-components/AgentModal";
import TopBar from "./TopBar";
import AgentsOverview from "../agents-components/AgentsOverview";
import { handleUnauthorized } from "../../utils/auth";

export default function Agents() {
    const {id} = useParams();

    const [tenant, setTenant] = useState(null);
    const [agents, setAgents] = useState([]);
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [typeFilter, setTypeFilter] = useState("");

    useEffect(() => {
        const fetchTenant = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch(`https://api.voixup.fr/admin/tenants/${id}`,{
                headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                },
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

    useEffect(() => {
        const fetchAgents = async () => {
            try {
            const token = localStorage.getItem("token");
            const params = new URLSearchParams();

            if (typeFilter) params.append("type", typeFilter);

            const url = `https://api.voixup.fr/admin/tenants/${id}/agents${
                params.toString() ? `?${params.toString()}` : ""
            }`;

        const res = await fetch(
            url,
            {
                headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
                },
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

            setAgents(data);

            } catch (err) {
            console.error(err);
            setAgents([]);
            }
        };

        fetchAgents();
    },[id, typeFilter]);

    return(
        <div className="flex min-h-screen bg-white text-black">
            <TenantSidebar tenant={tenant} />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1 flex flex-col">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} setShowAgentModal={setShowAgentModal} />
                <AgentsOverview 
                tenant={tenant} 
                agents={agents} 
                setAgents={setAgents}
                setShowAgentModal={setShowAgentModal}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
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