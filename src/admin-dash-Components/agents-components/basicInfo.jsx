export default function BasicInfo({selectedTenant}) {
    return(
        <div>
            {/* Tenant name (readonly) */}
            <div className="flex flex-col gap-4">
                <label className="text-xs text-[#7a8bb5] tracking-[0.08em] uppercase
                block mb-1.5">
                    Tenant ID {" "}
                    <span className="text-[#b0bcd4] font-normal">(auto)</span>
                </label>
                <input
                type="text"
                value={selectedTenant.id}
                readOnly
                className="w-full px-3.5 py-2.5 text-sm border rounded-md outline-none 
                border-gray-300 placeholder-gray-400
                focus:border-[#032ca6] cursor-not-allowed"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                    tracking-wider mb-1.5">
                        Agent Name <span className="text-[#ef4444]">*</span>
                    </label>
                    <input 
                    type="text" 
                    placeholder="e.g. Support Agent FR" 
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                    border-gray-300 placeholder-gray-400
                    focus:border-[#032ca6]"
                    required />
                </div>

                <div>
                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                    tracking-wider mb-1.5">
                        Type <span className="text-[#ef4444]">*</span>
                    </label>
                    <select className="w-full px-3 py-2 rounded-md text-sm text-slate-800 cursor-pointer
                    border-gray-300">
                        <option value="inbound">Inbound</option>
                        <option value="outbound">Outbound</option>
                        <option value="both">Both</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                    tracking-wider mb-1.5">
                        SIP Number <span className="text-[#ef4444]">*</span>
                    </label>
                    <input 
                    type="text" 
                    placeholder="+33 1 23 45 67 89" 
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                    border-gray-300 placeholder-gray-400
                    focus:border-[#032ca6]" 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                    tracking-wider mb-1.5">
                        System Prompt <span className="text-[#ef4444]">*</span>
                    </label>
                    <textarea 
                    rows="4" 
                    placeholder="You are a helpful assistant for..." 
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                    border-gray-300 placeholder-gray-400
                    focus:border-[#032ca6] resize-none leading-relaxed" 
                    >
                    </textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                        tracking-wider mb-1.5">
                            Greeting Message <span className="text-[#ef4444]">*</span>
                        </label>
                        <textarea 
                        rows="3" 
                        placeholder="Hello! How can I help you today?" 
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6] resize-none leading-relaxed" ></textarea>
                    </div>
                    <div>
                        <label className="block text-[10px] font-medium text-[#7a8bb5] uppercase 
                        tracking-wider mb-1.5">
                            End Call Message <span className="text-[#ef4444]">*</span>
                        </label>
                        <textarea 
                        rows="3" 
                        placeholder="Thank you for calling. Goodbye!" 
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6] resize-none leading-relaxed" ></textarea>
                    </div>
        </div>
            </div>
        </div>
    )
}