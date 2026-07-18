import { Repeat, PhoneOff, FileText, X } from "lucide-react"
import { useState } from "react";
export default function ActionsTypeList({onClose, open, setOpen, setOpenCreateCallTransfer}) {
    
    const ACTIONS = [
        {
            key: "transfer",
            icon: Repeat,
            iconBg: "bg-[#3b9dd4]",
            title: "Call Transfer",
            description: "Allows transferring the call to another number from a list of chosen numbers.",
        },
        {
            key: "hangup",
            icon: PhoneOff,
            iconBg: "bg-[#4b5563]",
            title: "Hang Up the Call",
            description: "Allows the agent to end the call after a minimum number of attempts.",
        },
        {
            key: "rag",
            icon: FileText,
            iconBg: "bg-[#e05b5b]",
            title: "Retrieval-Augmented Generation",
            description:
                "Allows the agent to retrieve documents from a data source that can help answer the caller's question.",
        },
    ]

    const [selected, setSelected] = useState(null);
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`flex-col fixed top-0 right-0 h-full z-50 bg-[#161b22] border-l scroll overflow-y-auto w-120 shrink-0 border-[#21262d]
                shadow-[-4px_0_24px_rgba(0,0,0,.4)] ${open ? "translate-x-0" : "translate-x-full"}`}>
                {/* HEADER */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#8b949e] shrink-0">
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#e6edf3] text-base tracking-tight">
                            Add an Action
                        </div>
                        <div className="text-xs text-[#8b949e] mt-0.5">
                            During the Call 
                        </div>
                    </div>
                    <button onClick={onClose}
                    className="w-7 h-7 rounded-lg border border-[#30363d]
                    bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer flex items-center
                    justify-center hover:text-[#e6edf3] transition-colors">
                        <X size={18}/>
                    </button>
                </div>

                {/* list */}
                <div className="px-4 py-4 flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
                    {ACTIONS.map((action) => {
                        const Icon = action.icon;
                        const isActive = selected === action.key;
                        return (
                            <button
                            key={action.key}
                            onClick={() => {
                                setSelected(action.key)

                                if (action.key === "transfer") {
                                    setOpenCreateCallTransfer(true);
                                }

                                setOpen(false);
                            }}
                            className={`cursor-pointer flex items-start gap-3 text-left px-4 py-3.5 rounded-xl border transition-colors ${
                                isActive
                                ? "bg-[#161b22] border-[#58a6ff]/50"
                                : "bg-[#161b22] border-transparent hover:border-[#58a6ff]/50"
                            }`}
                            >
                                <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${action.iconBg}`}
                                >
                                    <Icon size={16} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">{action.title}</div>
                                    <p className="text-xs text-[#8b949e] mt-0.5 leading-relaxed">
                                    {action.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}