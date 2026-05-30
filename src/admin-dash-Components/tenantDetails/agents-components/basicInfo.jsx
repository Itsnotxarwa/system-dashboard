export default function BasicInfo({selectedTenant, agentData, setAgentData}) {
    return(
        <div>
            <div className="mb-3">
                <label className="text-xs text-[#8b949e] tracking-[0.08em] uppercase block mb-1.5">
                    Tenant ID <span className="text-[#8b949e] font-normal">(auto)</span>
                </label>
                <input
                type="text"
                value={selectedTenant?.id || ""}
                readOnly
                className="w-full px-3 py-2 text-sm border rounded-md outline-none
                bg-[#0d1117] border-[#30363d] text-[#8b949e] font-mono
                focus:border-[#58a6ff] cursor-not-allowed transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                        Agent Name <span className="text-[#f85149]">*</span>
                    </label>
                    <input
                    type="text"
                    value={agentData.name || ""}
                    onChange={(e) => setAgentData(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g. Support Agent FR"
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                    focus:border-[#58a6ff] transition-colors font-mono"
                    required />
                </div>

                <div>
                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                        Type <span className="text-[#f85149]">*</span>
                    </label>
                    <select
                    value={agentData.type || ""}
                    onChange={(e) => setAgentData(prev => ({...prev, type: e.target.value}))}
                    className="w-full px-3 py-2 rounded-md text-sm cursor-pointer
                    bg-[#0d1117] border border-[#30363d] text-[#e6edf3]
                    focus:border-[#58a6ff] transition-colors">
                        <option value="inbound">Inbound</option>
                        <option value="outbound">Outbound</option>
                        <option value="both">Both</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                        SIP Number <span className="text-[#f85149]">*</span>
                    </label>
                    <input
                    type="text"
                    value={agentData.sip_number || ""}
                    onChange={(e) => setAgentData(prev => ({...prev, sip_number: e.target.value}))}
                    placeholder="+33 1 23 45 67 89"
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                    focus:border-[#58a6ff] transition-colors font-mono"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                        System Prompt <span className="text-[#f85149]">*</span>
                    </label>
                    <textarea
                    value={agentData.system_prompt || ""}
                    onChange={(e) => setAgentData(prev => ({...prev, system_prompt: e.target.value}))}
                    rows="4"
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                    focus:border-[#58a6ff] resize-none leading-relaxed transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                        Greeting Message <span className="text-[#f85149]">*</span>
                    </label>
                    <textarea
                    value={agentData.greeting_message || ""}
                    onChange={(e) => setAgentData(prev => ({...prev, greeting_message: e.target.value}))}
                    rows="3"
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                    focus:border-[#58a6ff] resize-none leading-relaxed transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-medium text-[#8b949e] uppercase tracking-wider mb-1.5">
                        End Call Message <span className="text-[#f85149]">*</span>
                    </label>
                    <textarea
                    value={agentData.end_call_message || ""}
                    onChange={(e) => setAgentData(prev => ({...prev, end_call_message: e.target.value}))}
                    rows="3"
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                    bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                    focus:border-[#58a6ff] resize-none leading-relaxed transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}