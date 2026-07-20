import { X, Repeat, Info } from "lucide-react";
import AddNumber from "./create-action-components/AddNumber";
import RestrictSchedule from "./create-action-components/RestrictSchedule";

export default function CreateCallTransfer({onClose, onCancel, handleSubmit, submitting, form, setForm}) {

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

                <div className="flex-1 overflow-y-auto px-6 py-5">

                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#39d3bb] flex items-center justify-center shrink-0">
                            <Repeat size={18} className="text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">Call Transfer</div>
                            <div className="text-xs text-[#8b949e] mt-0.5 leading-relaxed">
                            Transfers the call to another number from a list of chosen numbers.
                            </div>
                        </div>
                    </div>

                {/*Form */}
                <div className="px-4 py-4.5">
                    <div className="flex flex-col gap-4">

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                                Action Name <span className="text-[#f85149]">*</span>
                            </label>

                            <input
                                value={form.name}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Transfer"
                                className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                placeholder-[#8b949e] focus:border-[#58a6ff]
                                transition-colors font-mono"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                                Description
                            </label>

                            <textarea
                                rows={3}
                                value={form.description}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Describe when this transfer action should be used."
                                className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                placeholder-[#8b949e] resize-none
                                focus:border-[#58a6ff] transition-colors font-mono"
                            />
                        </div>

                        <div className="h-px bg-[#8b949e] my-6" />

                        {/*before_execution */}
                        <div>
                            <div className="text-sm font-semibold text-white mb-1">
                                Message before execution
                            </div>
                            <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">
                                Configure the message spoken by the agent before executing the action.
                            </p>

                            <div className="flex items-center justify-between bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 mb-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-[#e6edf3]">
                                        Should the agent say something before execution?
                                    </span>
                                </div>
                                {/*Toggle */}
                            <div
                            onClick={() => setForm(prev => ({
                                ...prev,
                                say_before_execution: !prev.say_before_execution,
                            }))}
                            className={`w-10 h-5 rounded-full cursor-pointer transition-all relative shrink-0 ${
                                form.say_before_execution ? "bg-[#58a6ff]" : "bg-[#30363d]"
                            }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 shadow transition-all ${
                                        form.say_before_execution
                                            ? "translate-x-5"
                                            : "translate-x-0.5"
                                    }`}
                                />
                            </div>
                            </div>

                            {form.say_before_execution && (
                            <div>
                                <div className="flex items-center gap-1 mb-1.5">
                                    <label className="text-xs text-[#8b949e]">Example message to say before execution</label>
                                    <Info size={11} className="text-[#484f58]" />
                                </div>

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

                        <div className="h-px bg-[#8b949e] my-6" />

                        {/* Restrict Schedule */}
                        <RestrictSchedule
                        form={form}
                        setForm={setForm} />

                        <div className="h-px bg-[#8b949e] my-6" />

                        {/* Ring duration */}
                        <div>
                            <label className="text-xs font-semibold text-white mb-1.5 block leading-relaxed">
                                Maximum ring duration (in seconds) before interrupting the transfer and resuming the call
                            </label>

                            <input
                                type="number"
                                min={1}
                                value={form.max_ring_duration_seconds}
                                onChange={(e)=>
                                    setForm(prev=>({
                                        ...prev,
                                        max_ring_duration_seconds:Number(e.target.value)
                                    }))
                                }
                                className="w-full px-3 py-2 rounded-md border
                                bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                focus:border-[#58a6ff] outline-none"
                            />
                        </div>
                        
                        <div className="h-px bg-[#8b949e] my-6" />

                        {/* Add Phone Number */}
                        <AddNumber
                        form={form}
                        setForm={setForm} />
                        
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-4 py-4 border-t
                border-[#21262d] shrink-0">
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
                            {submitting ? "Creating..." : "Create Action"}
                        </button>
                    </div>
                </div>

                </div>
            </div>
        </div>
    )
}