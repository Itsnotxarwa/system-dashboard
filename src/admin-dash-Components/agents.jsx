import Sidebar from "./sidebar";
import { useState, useEffect, useCallback } from "react";
import { handleUnauthorized } from "../utils/auth";
import Logo from "../assets/image_logo.png";
import Mazia from "../assets/mazia.png";
import AgentsTable from "./agents-components/agentsTable";

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);

    // filters
    const [tenantId, setTenantId] = useState("");
    const [type, setType] = useState("");
    const [sipNumber, setSipNumber] = useState("");

    const token = localStorage.getItem("token");

    const fetchAgents = useCallback(async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (tenantId) params.append("tenant_id", tenantId);
            if (type) params.append("type", type);
            if (sipNumber) params.append("sip_number", sipNumber);

            const url = `https://api.voixup.fr/admin/agents?${params.toString()}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (response.status === 404) {
                setAgents([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch agents");
            }

            const data = await response.json();
            setAgents(data);
        } catch (error) {
            console.error("Error fetching agents:", error);
            setAgents([]);
        } finally {
            setLoading(false);
        }
    }, [tenantId, type, sipNumber, token]);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-55">
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex items-center justify-start gap-2">
                        <img src={Logo} alt="Mazia" className="w-3.5" />
                        <img src={Mazia} alt="Mazia" className="w-7" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Agents Overview
                    </h1>

                    {/* Filters */}
                    <div className="flex items-center gap-4 mb-6 flex-wrap">
                        <input type="text"
                        placeholder="Tenant ID"
                        value={tenantId}
                        onChange={(e) => setTenantId(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-65 text-[#0a1628]" />
                        <input 
                        type="text" 
                        placeholder="SIP number" 
                        value={sipNumber}
                        onChange={(e) => setSipNumber(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-50 text-[#0a1628]"
                        />
                        <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                        w-65 text-[#0a1628] cursor-pointer">
                            <option value="">All types</option>
                            <option value="inbound">inbound</option>
                            <option value="outbound">outbound</option>
                        </select>
                    </div>
                    
                    {/* Agents Table */}
                    <AgentsTable loading={loading} agents={agents} />
                </div>
            </main>
        </div>
    )
}