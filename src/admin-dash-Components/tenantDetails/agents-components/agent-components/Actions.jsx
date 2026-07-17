import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import apiFetch from "../../../shared/ApiFetch";
import Loading from "../../../shared/Loading";
import { ArrowLeft } from "lucide-react";
import TenantSidebar from "../../tenantSidebar";
import TopBar from "../../TopBar";
import CreateCallTransfer from "./actions-components/CreateCallTransfer";
import ActionDuringCall from "./actions-components/ActionDuringCall";

export default function Actions() {
    const { id, agentId } = useParams();
    const [tenant, setTenant] = useState(null);
    const [agent, setAgent] = useState(null);

    const [callTransferActions, setCallTransferActions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const [openCreateCallTransfer, setOpenCreateCallTransfer] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        agent_id: agentId,
        
        say_before_execution: true,
        before_execution_message: "",
        
        restrict_to_schedule: false,
        max_ring_duration_seconds: 25,
        
        schedule_days: [],

        numbers: [],
    });

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            agent_id: agentId,
        }));
    }, [agentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        setSubmitting(true);

        const res = await apiFetch(
            `https://api.mazia.ai/admin/agents/${agentId}/call_transfer_actions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            }
        );

        if (!res) {
    throw new Error("No response from server");
}

if (!res.ok) {
    const errorData = await res.json();

    throw new Error(
        errorData.detail || "Failed to create call transfer action"
    );
}

        const data = await res.json();
        console.log("Created call transfer action:", data);

        setCallTransferActions(prev => [...prev, data]);

        setForm({
            name: "",
            description: "",
            agent_id: agentId,
            say_before_execution: true,
            before_execution_message: "",
            restrict_to_schedule: false,
            max_ring_duration_seconds: 25,
            schedule_days: [],
            numbers: [],
        });

        setOpenCreateCallTransfer(false);

    } catch (error) {
        console.error(error);
    } finally {
        setSubmitting(false);
    }
};

    {/* fetch Tenant */}
    useEffect(() => {
        const fetchTenant = async () => {
            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}`);
            if (!res) return;  
            const data = await res.json();
            setTenant(data);
            console.log("Fetched tenant:", data);
        }   
        fetchTenant();
    }, [id]);

    {/* fetch Agent */}
    useEffect(() => {
        const fetchAgent = async () => {
            const res = await apiFetch(
                `https://api.mazia.ai/admin/tenants/${id}/agents/${agentId}`
            );

            if (!res) return;

            const data = await res.json();
            setAgent(data);
            console.log("Fetched agent:", data);
            console.log(data.name)
        };

        fetchAgent();
    }, [id, agentId]);

    const activeItem = agent?.name;

    {/* fetch Call Transfer Actions */}
    useEffect(() => {
        if (!agentId) return;

        const fetchCallTransferActions = async () => {
            try{
                setLoading(true);

                const res = await apiFetch(`https://api.mazia.ai/admin/agents/${agentId}/call_transfer_actions`)
                if (!res) return;

                if (!res || !res.ok) {
                    throw new Error("Failed to fetch call transfer actions");
                }

                const data = await res.json();
                setCallTransferActions(data);
                console.log("Fetched call transfer actions:", data);
            } catch (error) {
                console.error("Error fetching call transfer actions:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCallTransferActions();
    }, [agentId]);

    if (loading) {
        return <Loading />;
    }
    

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} label="Agents" />
            <main className="bg-[#0d1117] flex-1 ml-55">
                <TopBar tenant={tenant} activeNav={{name: "Agents"}} activeItem={activeItem} activeSubPage="Actions" showAddAgent={false} />
                <div className="max-w-7xl mx-auto p-6 flex-1 bg-[#0d1117]">
                    <div className="flex-1 overflow-y-auto flex flex-col">
                        <div className="flex-1">
                            <div className="mb-5 flex items-center gap-2">
                                <button 
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center w-6 h-6 bg-[#eeeeee4b]
                                rounded-full transition-all cursor-pointer duration-200 hover:shadow-[9px_9px_33px_#d1d1d1] hover:translate-y-0.5">
                                    <ArrowLeft className="mr-1.25 ml-1.25 transition-all duration-300 ease-in hover:translate-x-1.25" />
                                </button>
                                <div>
                                    <p className="text-[16px] text-white mb-0.5 font-bold">Actions</p>
                                    <p className="text-sm text-[#8b949e]">Configure the actions performed by your agent during the conversation.</p>
                                </div>
                            </div>

                            <div className="h-px w-full bg-[#30363d] mb-5" />

                            <div className="px-8 py-6">
                                {/* Pre-call */}
                                {/* <div className="mb-8">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h2 className="text-sm font-semibold text-slate-100">Actions pré-appel</h2>
                                        <Info size={13} className="text-[#8b949e]" />
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">
                                        Workflows that run before each conversation to enrich the conversation context. 
                                        Only one published workflow and one restricted workflow can be enabled at a time.
                                    </p>
                                    <EmptyActionBox addLabel="Add an action" />
                                </div>*/}

                                {/* During call */}
                                <ActionDuringCall 
                                setOpenCreateCallTransfer={setOpenCreateCallTransfer}
                                callTransferActions={callTransferActions}
                                />

                                {/* Post-call */}
                                {/* <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h2 className="text-sm font-semibold text-slate-100">Actions post-appel</h2>
                                        <Info size={13} className="text-[#8b949e]" />
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">
                                        Workflows exécutés à la fin de la conversation pour finaliser le traitement.
                                    </p>
                                    <EmptyActionBox addLabel="Add an action" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {openCreateCallTransfer && (
                <CreateCallTransfer
                onClose={() => setOpenCreateCallTransfer(false)}
                onCancel={() => setOpenCreateCallTransfer(false)}
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                submitting={submitting}
                />
            )}
        </div>
    )
}