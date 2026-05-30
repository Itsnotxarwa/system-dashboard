import { useState } from "react";
import { X, Edit, Plus } from "lucide-react";

export default function EditCampaign({onClose, onCancel}) {
    const [showSlot, setShowSlot] = useState(false);
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(0,0,0,0.6)] backdrop-blur-sm p-5">
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl
            shadow-[0_24px_80px_rgba(0,0,0,0.5)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh]
            flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#21262d] shrink-0">
                    <div className="w-9 h-9 rounded-[11px] bg-linear-to-br from-[#1c50a0] to-[#58a6ff]
                    flex items-center justify-center text-white shrink-0">
                        <Edit />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#e6edf3] text-base tracking-tight"
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                            Edit Campaign
                        </div>
                        <div className="text-xs text-[#8b949e] mt-0.5">
                            Update campaign configuration and models
                        </div>
                    </div>
                    <button
                    onClick={onClose}
                    className="w-7.5 h-7.5 rounded-lg border border-[#30363d]
                    bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer flex items-center
                    justify-center hover:text-[#e6edf3] transition-colors">
                        <X />
                    </button>
                </div>

                {/* Form */}
                <div className="overflow-y-auto scroll flex-1 px-6 py-5 space-y-4">
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Campaign Name <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                        focus:border-[#58a6ff] transition-colors font-mono"
                        />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Start Date <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                        focus:border-[#58a6ff] transition-colors"
                        type="date" />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Batch Size <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                        focus:border-[#58a6ff] transition-colors font-mono"
                        type="number" min={1} max={500} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Time Slots <span className="text-[#f85149]">*</span>
                        </label>
                        <button className="text-[10px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1
                        bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.2)]"
                        onClick={() => setShowSlot(true)}>
                            <Plus size={12} />
                            Add Slot
                        </button>
                    </div>
                    {showSlot && (
                        <div className="flex items-center gap-2 p-[10px_12px] rounded-[10px]
                        bg-[rgba(255,255,255,.03)] border border-[#21262d]">
                            <span className="text-xs text-[#8b949e] flex-nowrap">Start</span>
                            <input
                            type="time"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                            focus:border-[#58a6ff] transition-colors" />
                            <span className="text-xs text-[#8b949e] flex-nowrap">End</span>
                            <input
                            type="time"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                            focus:border-[#58a6ff] transition-colors" />
                            <div className="flex justify-center items-center">
                                <button className="w-6 h-6 rounded-md border border-[rgba(248,81,73,.25)]
                                bg-[rgba(248,81,73,.08)] text-[#f85149] cursor-pointer flex items-center
                                justify-center hover:bg-[rgba(248,81,73,.15)] transition-colors">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t
                border-[#21262d] bg-[rgba(255,255,255,.02)] shrink-0">
                    <div className="flex gap-2.5">
                        <button
                        onClick={onCancel}
                        className="flex-1 cursor-pointer px-5 py-2.5 rounded-xl text-xs font-medium text-[#8b949e]
                        hover:text-[#e6edf3] transition-colors border border-[#30363d]
                        bg-[rgba(255,255,255,.04)]">
                            Cancel
                        </button>
                        <button
                        className="flex-1 cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white
                        bg-linear-to-r from-[#1c50a0] to-[#58a6ff] border border-[rgba(88,166,255,.25)]
                        shadow-[0_4px_14px_rgba(88,166,255,.2)] hover:opacity-90 transition-all">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}