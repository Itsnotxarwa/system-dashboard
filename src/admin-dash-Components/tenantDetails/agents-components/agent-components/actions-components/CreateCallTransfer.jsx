import SectionHeader from "./SectionHeader";
import { X, Volume2, Plus } from "lucide-react";
export default function CreateCallTransfer({onClose, onCancel, handleSubmit, submitting, form, setForm}) {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`flex-col fixed top-0 right-0 h-full z-50 bg-[#161b22] border-l scroll overflow-y-auto w-120 shrink-0 border-[#21262d]
                shadow-[-4px_0_24px_rgba(0,0,0,.4)] ${open ? "translate-x-0" : "translate-x-full"}`}>
                {/* HEADER */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#8b949e] shrink-0">
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
                        {/* Action Details */}
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-[#e6edf3]">
                                Action Details
                            </div>
                            <div className="text-xs text-[#8b949e] mt-1">
                                Name and description displayed in the actions list.
                            </div>
                        </div>

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
                                placeholder="e.g. Transfer to Support"
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
                        <SectionHeader
                            icon={<Volume2 size={14} />}
                            title="Announce Before Transfer"
                            subtitle="Inform the caller before executing the transfer."
                        />
                        <div className="flex items-center justify-between bg-white/2 border border-white/5 rounded-xl px-4 py-3 mb-4">
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

                        <div className="h-px bg-[#8b949e] my-6" />

                        <SectionHeader
                            title="Transfer Availability"
                            subtitle="Limit transfers to specific business hours."
                        />

                        <div className="flex items-center justify-between bg-white/2 border border-white/5 rounded-xl px-4 py-3">
                            <div>
                                <div className="text-sm text-slate-200">
                                    Restrict to Schedule
                                </div>

                                <div className="text-xs text-slate-500 mt-0.5">
                                    Transfers will only happen during configured hours.
                                </div>
                            </div>

                            <input
                                type="checkbox"
                                checked={form.restrict_to_schedule}
                                onChange={(e)=>
                                    setForm(prev=>({
                                        ...prev,
                                        restrict_to_schedule:e.target.checked
                                    }))
                                }
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2 text-[10px] uppercase tracking-wider text-[#8b949e]">
                                Maximum Ring Duration (seconds)
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

                        <SectionHeader
                            title="Transfer Numbers"
                            subtitle="Numbers that the call can be transferred to."
                        />

                        {form.numbers.map((number,index)=>(
                        <div
                        key={index}
                        className="border border-[#30363d] rounded-xl p-4 space-y-3 mb-4"
                        >

                        <input
                        placeholder="Country Code"
                        value={number.country_code}
                        onChange={(e)=>{
                            const updated=[...form.numbers];
                            updated[index].country_code=e.target.value;
                            setForm({...form,numbers:updated});
                        }}
                        className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d]"
                        />

                        <input
                        placeholder="Phone Number"
                        value={number.phone_number}
                        onChange={(e)=>{
                        const updated=[...form.numbers];
                        updated[index].phone_number=e.target.value;
                        setForm({...form,numbers:updated});
                        }}
                        className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d]"
                        />

                        <input
                        placeholder="Description"
                        value={number.description}
                        onChange={(e)=>{
                        const updated=[...form.numbers];
                        updated[index].description=e.target.value;
                        setForm({...form,numbers:updated});
                        }}
                        className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d]"
                        />

                        <input
                        placeholder="Announcement Message"
                        value={number.message}
                        onChange={(e)=>{
                        const updated=[...form.numbers];
                        updated[index].message=e.target.value;
                        setForm({...form,numbers:updated});
                        }}
                        className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d]"
                        />

                        <button
                        type="button"
                        onClick={()=>{
                        const updated=form.numbers.filter((_,i)=>i!==index);
                        setForm({...form,numbers:updated});
                        }}
                        className="text-red-400 text-sm"
                        >
                        Remove Number
                        </button>

                        </div>
                        ))}

                            <button
                            type="button"
                            onClick={()=>
                            setForm(prev=>({
                            ...prev,
                            numbers:[
                            ...prev.numbers,
                            {
                            country_code:"+33",
                            phone_number:"",
                            description:"",
                            message:"",
                            source:"manual",
                            display_order:prev.numbers.length
                            }
                            ]
                            }))
                            }
                            className="px-4 flex items-center gap-2 py-2 rounded-lg border border-[#58a6ff]
                            text-[#58a6ff] hover:bg-[#58a6ff]/10"
                            >
                                <Plus />
                                Add Number
                            </button>
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