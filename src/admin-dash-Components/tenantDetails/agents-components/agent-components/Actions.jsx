import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiFetch from "../../../shared/ApiFetch";
import Loading from "../../../shared/Loading";

export default function Actions() {
    const { agentId } = useParams();

    const [callTransferActions, setCallTransferActions] = useState([]);
    const [loading, setLoading] = useState(false);

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
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 p-6">
                <div className="mb-5">
                    <p className="text-[16px] text-white mb-0.5 font-bold">Actions</p>
                    <p className="text-sm text-[#8b949e]">Configure the actions performed by your agent during the conversation.</p>
                </div>

                <div className="h-px w-full bg-[#30363d] mb-5" />

                <div className="mb-6"></div>
            </div>
        </div>
    )
}