import Sidebar from "./sidebar";
import { useState, useEffect, useCallback } from "react";
import Logo from "../assets/image_logo.png";
import Mazia from "../assets/mazia.png";
import AgentsTable from "./agents-components/agentsTable";
import AgentDetails from "./agents-components/AgentDetails";
import EditAgent from "./agents-components/EditAgent";
import DeleteAgent from "./agents-components/DeleteAgent";
import apiFetch from "./shared/ApiFetch";

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showAgentDetails, setShowAgentDetails] = useState(false);
    const [showEditAgent, setShowEditAgent] = useState(false);
    const [showDeleteAgent, setShowDeleteAgent] = useState(false);
    const [loading, setLoading] = useState(false);

    // filters
    const [tenantId, setTenantId] = useState("");
    const [type, setType] = useState("");
    const [sipNumber, setSipNumber] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);


    {/* fetch Agents */}
    const fetchAgents = useCallback(async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (tenantId) params.append("tenant_id", tenantId);
            if (type) params.append("type", type);
            if (sipNumber) params.append("sip_number", sipNumber);
            params.append("page", page);
            params.append("page_size", pageSize);

            const url = `https://api.mazia.ai/admin/agents?${params.toString()}`;

            const response = await apiFetch(url, {
                method: "GET",
            });


            if (response.status === 404) {
                setAgents([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch agents");
            }

            const data = await response.json();
            setAgents(data.agents || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("Error fetching agents:", error);
            setAgents([]);
        } finally {
            setLoading(false);
        }
    }, [tenantId, type, sipNumber, page, pageSize]);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);

    const deleteAgent = async (AgentId) => {
        try{
            const response = await apiFetch(`
                https://api.mazia.ai/admin/agents/${AgentId}`,
            {
                method: "DELETE",
            }
        );

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
        setShowEditAgent(true);
    };
    const handleDelete = (agent) => {
        setSelectedAgent(agent);
        setShowDeleteAgent(true);
    };

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
                    <div className="flex items-center gap-3 py-6 flex-wrap">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input
                            type="text"
                            placeholder="Tenant ID"
                            value={tenantId}
                            onChange={(e) => setTenantId(e.target.value)}
                            className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            font-mono text-[12.5px] rounded-md pl-9 pr-3 py-2 w-64
                            focus:outline-none focus:border-[#58a6ff] transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
                            </svg>
                            <input
                            type="text"
                            placeholder="SIP number"
                            value={sipNumber}
                            onChange={(e) => setSipNumber(e.target.value)}
                            className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            font-mono text-[12.5px] rounded-md pl-9 pr-3 py-2 w-48
                            focus:outline-none focus:border-[#58a6ff] transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                            </svg>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="bg-[#161b22] border border-[#30363d] text-[#e6edf3]
                                font-mono text-[12.5px] rounded-md pl-9 pr-8 py-2 w-44
                                focus:outline-none focus:border-[#58a6ff] transition-colors cursor-pointer appearance-none"
                            >
                                <option value="">All types</option>
                                <option value="inbound">inbound</option>
                                <option value="outbound">outbound</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </div>
                    </div>
                    
                    {/* Agents Table */}
                    <AgentsTable 
                    loading={loading} 
                    agents={agents}
                    setSelectedAgent={setSelectedAgent}
                    selectedAgent={selectedAgent}
                    setShowAgentDetails={setShowAgentDetails}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                    />
                </div>
            </main>
            {showAgentDetails && (
                <AgentDetails
                selectedAgent={selectedAgent}
                onClose={() => setShowAgentDetails(false)}
                handleEdit={handleEdit}
                handleDelete={handleDelete} />
            )}

            {showEditAgent && (
                <EditAgent
                selectedAgent={selectedAgent}
                onClose={() => setShowEditAgent(false)}
                onCancel={() => setShowEditAgent(false)}
                setAgents={setAgents} />
            )}

            {showDeleteAgent && (
                <DeleteAgent
                selectedAgent={selectedAgent}
                onCancel={() => setShowDeleteAgent(false)}
                onConfirm={(id) => {
                deleteAgent(id);
                setShowDeleteAgent(false);
                }}  />
            )}
        </div>
    )
}