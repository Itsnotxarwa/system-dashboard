import TenantSidebar from "./tenantSidebar";
import { useState, useEffect } from "react";
import { Bot, CassetteTape } from "lucide-react";
import { useParams } from "react-router-dom";
import TenantContent from "./tenantContent";
import AgentModal from "../agents-components/AgentModal";


export default function TenantDetails() {
    const navigation =[
        { name: "Agents", icon: Bot, href: "/agents" },
        { name: "Call Records", icon: CassetteTape, href: "/call-records" },
    ];
    const [activeNav, setActiveNav] = useState(navigation[0]);

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
            <TenantSidebar 
            activeNav={activeNav} 
            setActiveNav={setActiveNav}
            tenant={tenant}
            navigation={navigation} />
            <main className="bg-gray-50 flex-1">
                <TenantContent 
                tenant={tenant} 
                activeNav={activeNav} 
                agents={agents}
                setShowAgentModal={setShowAgentModal}
                showAgentModal={showAgentModal} />
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