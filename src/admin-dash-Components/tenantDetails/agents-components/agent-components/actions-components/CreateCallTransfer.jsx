import SectionHeader from "./SectionHeader";
import { X, Volume2 } from "lucide-react";
export default function CreateCallTransfer({onClose, onCancel, handleSubmit, submitting, form, setForm}) {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]
        backdrop-blur-sm p-5">
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl
            shadow-[0_24px_80px_rgba(0,0,0,0.5)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh] flex flex-col">
                {/* HEADER */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#21262d] shrink-0">
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#e6edf3] text-base tracking-tight"
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif"}}>
                            Add Call Action
                        </div>
                        <div className="text-xs text-[#8b949e] mt-0.5">
                            During Call Actions are executed during the conversation to handle requests in real time.
                        </div>
                    </div>
                    <button onClick={onClose}
                    className="w-7.5 h-7.5 rounded-lg border border-[#30363d]
                    bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer flex items-center
                    justify-center hover:text-[#e6edf3] transition-colors">
                        <X />
                    </button>
                </div>

                {/*Form */}
                <div className="px-6 py-6.5">
                    <div className="flex flex-col gap-4">
                        {/* Name */}
                        <div>
                            <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider 
                            uppercase">
                                Name <span className="text-[#f85149]">*</span>
                            </label>
                            <input
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            placeholder="e.g. Mazia Agency"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            focus:border-[#58a6ff] transition-colors font-mono"
                            />
                        </div>

                        {/* description */}
                        <div>
                            <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider 
                            uppercase">
                                Description <span className="text-[#f85149]">*</span>
                            </label>
                            <input
                            value={form.description}
                            onChange={(e) => setForm({...form, description: e.target.value})}
                            placeholder="e.g. Mazia Agency"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                            bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                            focus:border-[#58a6ff] transition-colors font-mono"
                            />
                        </div>

                        <div className="h-px bg-[#8b949e] my-6" />

                        
                        {/*before_execution */}
                        <SectionHeader
                            icon={<Volume2 size={14} />}
                            title="Announce Before Transfer"
                            subtitle="Inform the caller before executing the transfer."
                        />
                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 mb-4">
                            <div>
                                <div className="text-sm text-slate-200">Announce Before Transfer</div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                    The agent informs the caller before transferring the call.
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={form.say_before_execution}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        say_before_execution: e.target.checked,
                                    }))
                                }
                                className="h-4 w-4 cursor-pointer"
                            />
                        </div>

                        {form.say_before_execution && (
                            <div>
                                <label className="block mb-1.5 text-[10px] text-[#8b949e] uppercase tracking-wider">
                                    Announcement Message
                                </label>

                                <textarea
                                    value={form.before_execution_message}
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
                                            before_execution_message: e.target.value,
                                        }))
                                    }
                                    rows={2}
                                    placeholder="I'll transfer you to an agent. Please hold for a moment."
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                    bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                    placeholder-[#8b949e] resize-none
                                    focus:border-[#58a6ff] transition-colors font-mono"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t
                border-[#21262d] bg-[rgba(255,255,255,.02)] shrink-0">
                    <div className="flex gap-2.5">
                        <button onClick={onCancel}
                        className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#8b949e]
                        hover:text-[#e6edf3] transition-colors border border-[#30363d]
                        bg-[rgba(255,255,255,.04)]">
                            Cancel
                        </button>
                        <button 
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="cursor-pointer px-6 py-2.5 rounded-xl text-sm font-bold text-white
                        transition-all flex items-center gap-1.5
                        bg-linear-to-r from-[#1c50a0] to-[#58a6ff] border border-[rgba(88,166,255,.25)]
                        shadow-[0_4px_14px_rgba(88,166,255,.2)] hover:opacity-90">
                            {submitting ? "Creating..." : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}