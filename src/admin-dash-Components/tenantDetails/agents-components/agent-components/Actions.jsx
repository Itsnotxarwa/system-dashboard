import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiFetch from "../../../shared/ApiFetch";
import Loading from "../../../shared/Loading";
import { Info, PhoneOff, Plus, Repeat } from "lucide-react";
import EmptyActionBox from "./actions-components/EmptyActionBox";
import ActionRow from "./actions-components/ActionRow";
import TenantSidebar from "../../tenantSidebar";
import TopBar from "../../TopBar";

export default function Actions() {
    const { id, agentId } = useParams();
    const [tenant, setTenant] = useState(null);
    const [agent, setAgent] = useState(null);

    const [callTransferActions, setCallTransferActions] = useState([]);
    const [loading, setLoading] = useState(false);

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
                                <button className="flex items-center justify-center w-[3em] h-[3em] bg-[#eeeeee4b]
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
                                <div className="mb-8">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h2 className="text-sm font-semibold text-slate-100">Actions pré-appel</h2>
                                        <Info size={13} className="text-[#8b949e]" />
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">
                                        Workflows that run before each conversation to enrich the conversation context. 
                                        Only one published workflow and one restricted workflow can be enabled at a time.
                                    </p>
                                    <EmptyActionBox addLabel="Add an action" />
                                </div>

                                {/* During call */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h2 className="text-sm font-semibold text-slate-100">Actions During Call</h2>
                                        <Info size={13} className="text-[#8b949e]" />
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">
                                        Actions executed during the conversation to handle requests in real time.
                                    </p>
                                    <div className="flex flex-col gap-2 mb-3">
                                        <ActionRow
                                            icon={<PhoneOff size={16} className="text-white" />}
                                            iconBg="bg-[#d29922]"
                                            name="Hang Up"
                                            description="Ends the current call."
                                        />
                                        <ActionRow
                                            icon={<Repeat size={16} className="text-white" />}
                                            iconBg="bg-teal-500"
                                            name="Call Transfer"
                                            description="Transfers the call to another number or a human."
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button className="cursor-pointer flex items-center gap-1.5 text-sm px-6 py-2.5 rounded-lg 
                                        text-[#58a6ff] hover:bg-[rgba(88,166,255,.08)] border border-[rgba(88,166,255,.25)]
                                        transition-colors font-mono">
                                            <span className="text-[#58a6ff] text-base leading-none">
                                                <Plus size={14} />
                                            </span> Add Action
                                        </button>
                                    </div>
                                </div>

                                {/* Post-call */}
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h2 className="text-sm font-semibold text-slate-100">Actions post-appel</h2>
                                        <Info size={13} className="text-[#8b949e]" />
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">
                                        Workflows exécutés à la fin de la conversation pour finaliser le traitement.
                                    </p>
                                    <EmptyActionBox addLabel="Add an action" />
                                </div>
                            </div>

                <div className="mb-6">
                    {callTransferActions.length === 0 ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No call transfer actions available.</div>
                    ) : (
                        <div className="space-y-2">
                            {callTransferActions.map((action) => (
                                <div key={action.id} className="bg-[#21262d] p-4 rounded-lg">
                                    <p className="text-[14px] text-white font-medium">{action.name}</p>
                                    <p className="text-sm text-[#8b949e]">{action.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
                    </div>
                </div>
            </main>
        </div>
    )
}