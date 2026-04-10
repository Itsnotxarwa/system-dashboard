import { useState } from "react"

export default function EditCampaign() {
    const [showSlot, setShowSlot] = useState(false);
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl  
            shadow-[0_24px_80px_rgba(3,44,166,0.18)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh]
            flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b shrink-0 border border-[rgba(3,44,166,0.08)]
                bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-base tracking-tight" 
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif;"}}>
                            New Campaign
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                            Fill in the campaign details below
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-[rgba(3,44,166,0.07)]
                        text-[#032ca6] border border-[rgba(3,44,166,0.14)]">
                            New Campaign
                        </span>
                        <button 
                        className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                        bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                        justify-center" 
                        >
                            <X />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="overflow-y-auto scroll flex-1 px-6 py-5 space-y-4">
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Campaign Name <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Start Date <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        type="date" />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Batch Size <span className="text-[#ef4444]">*</span>
                        </label>
                        <input 
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        type="number" min={1} max={500} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Time Slots <span className="text-[#ef4444]">*</span>
                        </label>
                        <button className="text-[10px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1
                        bg-[rgba(3,44,166,.08)] text-[#032ca6] border border-[rgba(3,44,166,.16)]"
                        onClick={() => setShowSlot(true)}>
                            <Plus size={12} />
                            Add Slot
                        </button>
                    </div>
                    {showSlot && (
                        <div className="flex items-center gap-2 p-[10px_12px] rounded-[10px] bg-[rgba(3,44,166,.03)]
                        border border-[rgba(3,44,166,.09)]">
                            <span className="text-xs text-[#7a8bb5] flex-nowrap">
                                Start
                            </span>
                            <input 
                            type="time"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            border-gray-300 placeholder-gray-400
                            focus:border-[#032ca6]" />
                            <span className="text-xs text-[#7a8bb5] flex-nowrap">
                                End
                            </span>
                            <input 
                            type="time"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            border-gray-300 placeholder-gray-400
                            focus:border-[#032ca6]" />
                            <div className="flex justify-center items-center">
                                <button className="w-6 h-6 rounded-md border border-[rgba(220,38,38,.18)]
                                bg-[rgba(220,38,38,.06)] text-[#dc2626] text-sm cursor-pointer flex items-center
                                justify-center">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t
                border-[rgba(3,44,166,0.08)] bg-[rgba(3,44,166,0.015)] shrink-0">
                    <div className="flex gap-2.5">
                        <button  
                        className="flex-1 cursor-pointer px-5 py-2.5 rounded-xl text-xs font-medium text-slate-500 
                        hover:text-slate-700 transition-all border border-[rgba(3,44,166,0.13)]
                        bg-[rgba(3,44,166,0.04)]">
                            Cancel
                        </button>
                        <button 
                        className="flex-1 cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white 
                        bg-[#032ca6] border border-[#032ca6]">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}