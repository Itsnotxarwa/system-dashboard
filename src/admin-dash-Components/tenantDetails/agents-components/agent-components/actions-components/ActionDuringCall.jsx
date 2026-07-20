import { Info, PhoneOff, Plus, Repeat } from "lucide-react";
import ActionRow from "./ActionRow";
import EmptyActionBox from "./EmptyActionBox";

export default function ActionDuringCall({ callTransferActions, setOpenActionsTypeList}) {
    return(
        <div className="mb-8">
            <div className="flex items-center gap-1.5 mb-1">
                <h2 className="text-[15px] font-semibold text-slate-100">Actions During Call</h2>
                <Info size={13} className="text-[#8b949e]" />
            </div>
            <p className="text-[13px] text-slate-500 mb-3">
                Actions executed during the conversation to handle requests in real time.
            </p>
            <div className="flex flex-col gap-2 mb-3">
                {callTransferActions?.length === 0 ? (
                    <EmptyActionBox 
                    onClick={() => setOpenActionsTypeList(true)}
                    addLabel="Add an action" />
                ) : (
                    callTransferActions?.map((action, index) => (
                        <div className="space-y-4">
                            <ActionRow
                                key={index}
                                icon={ 
                                    action?.name?.toLowerCase().includes("transfer") ? (
                                        <Repeat size={16} className="text-white" />
                                    ) : action?.name?.toLowerCase().includes("hang") ? (
                                        <PhoneOff size={16} className="text-white" />
                                    ) : null
                                }
                                iconBg={
                                    action?.name?.toLowerCase().includes("transfer")
                                        ? "bg-teal-500"
                                        : "bg-[#d29922]"
                                }
                                name={action?.name || ""}
                                description={action?.description || ""}
                            />
                            <div className="flex justify-center">
                                <button 
                                onClick={() => setOpenActionsTypeList(true)}
                                className="cursor-pointer flex items-center gap-1.5 text-sm px-6 py-2.5 rounded-lg 
                                text-[#58a6ff] hover:bg-[rgba(88,166,255,.08)] border border-[rgba(88,166,255,.25)]
                                transition-colors font-mono">
                                    <span className="text-[#58a6ff] text-base leading-none">
                                        <Plus size={14} />
                                    </span> Add Action
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}