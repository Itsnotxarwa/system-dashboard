import { Plus, X } from "lucide-react";

export default function Tools() {

    return(
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs font-bold text-slate-700" style="font-family:'Cabinet Grotesk',sans-serif">External Tools</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Add webhook tools the agent can call during conversations.</p>
                </div>
                <button 
                className="flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all bg-[rgba(3,44,166,0.08)]
                text-[#032ca6] border-[rgba(3,44,166,0.16)]">
                    <Plus />
                    Add Tool
                </button>
            </div>

                <div className="py-10 text-center text-[11px] text-slate-300 rounded-xl border-dashed border-[rgba(3,44,166,0.15)]">
                    No tools added yet. Click "Add Tool" to get started.
                </div>
                <div className="flex flex-col gap-3">
                        <div
                        className="p-4 rounded-xl relative bg-[rgba(3,44,166,0.03)]
                        border border-[rgba(3,44,166,0.10)]">

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    Tool 
                                </span>
                                <button
                                className="text-slate-300 hover:text-red-400 transition-colors text-base"
                                >
                                    <X />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                    tracking-wider mb-1.5">
                                        Name <span className="text-[#ef4444]">*</span>
                                    </label>
                                    <input 
                                    type="text" 
                                    placeholder="" 
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                    border-gray-300 placeholder-gray-400
                                    focus:border-[#032ca6]"
                                    required />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                    tracking-wider mb-1.5">
                                        URL <span className="text-[#ef4444]">*</span>
                                    </label>
                                    <input 
                                    type="text" 
                                    placeholder="https://api.example.com/" 
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                    border-gray-300 placeholder-gray-400
                                    focus:border-[#032ca6]"
                                    required />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                                    tracking-wider mb-1.5">
                                        Provider <span className="text-[#ef4444]">*</span>
                                    </label>
                                    <input 
                                    type="text" 
                                    placeholder="https://api.example.com/" 
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                                    border-gray-300 placeholder-gray-400
                                    focus:border-[#032ca6]"
                                    required />
                                </div>

                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                                        <input type="checkbox" defaultChecked />
                                        <span className="text-[11px] text-slate-600">Enabled</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
    )
}