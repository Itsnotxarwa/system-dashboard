import { Check, Key, Plus, X } from "lucide-react";

export default function CreateModal({setShowModal, form, setForm, handleSubmit, 
    createdTenant, setCreatedTenant, errors}) {
    const handleClose = () => {
        setCreatedTenant(null);
        setShowModal(false);
    };
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(0,0,0,0.6)] backdrop-blur-sm p-5">
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl w-full lg:max-w-md
            shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both]">
                {createdTenant ? (
                    <div className="p-8 flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[rgba(63,185,80,.12)] flex items-center
                        justify-center text-[#3fb950]">
                            <Check />
                        </div>
                        <div>
                            <div className="font-extrabold text-[16px] text-[#e6edf3]">
                                Tenant Created!
                            </div>
                            <div className="text-xs text-[#8b949e] mt-1">
                                Save this password — it won't be shown again.
                            </div>
                        </div>

                        {/* PASSWORD BOX */}
                        <div className="w-full px-4 py-3 rounded-xl bg-[rgba(88,166,255,.06)]
                        border border-[rgba(88,166,255,.15)] flex items-center justify-between gap-3">
                            <span className="font-mono text-sm font-bold text-[#58a6ff] tracking-widest">
                                {createdTenant.generated_password}
                            </span>
                            <button
                                onClick={() => navigator.clipboard.writeText(createdTenant.generated_password)}
                                className="text-[10px] text-[#58a6ff] border border-[rgba(88,166,255,.2)]
                                bg-[rgba(88,166,255,.08)] px-2 py-1 rounded-md cursor-pointer">
                                Copy
                            </button>
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-full py-2.5 text-xs font-bold text-white rounded-lg
                            bg-linear-to-r from-[#1c50a0] to-[#58a6ff] border border-[rgba(88,166,255,.25)] cursor-pointer mt-2">
                            Done
                        </button>
                    </div>
                ) : (
                <>
                {/* HEADER */}
                <div className="p-[22px_26px_18px] border-b border-[#21262d] flex items-center
                gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                            <Plus className="text-[#58a6ff]" />
                        </div>
                        <div>
                            <div className="font-extrabold text-[16px] text-[#e6edf3] tracking-tight">
                                Add New Tenant
                            </div>
                            <div className="mt-0.5 text-[#8b949e] text-xs">
                                Fill in the tenant details below
                            </div>
                        </div>
                    </div>
                    <button className="w-7.5 h-7.5 rounded-lg border border-[#30363d]
                    bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer text-[16px] flex items-center
                    justify-center hover:text-[#e6edf3] transition-colors"
                    onClick={() => setShowModal(false)}>
                        <X />
                    </button>
                </div>

            {/* FORM STEP */}
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
                        {errors.name && <p className="mt-1 text-[10px] text-[#f85149]">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Email <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        type="email"
                        placeholder="user@example.com"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                        focus:border-[#58a6ff] transition-colors font-mono"
                        />
                        {errors.email && <p className="mt-1 text-[10px] text-[#f85149]">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                            Phone <span className="text-[#f85149]">*</span>
                        </label>
                        <input
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        placeholder="+1 415 555 0192"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                        focus:border-[#58a6ff] transition-colors font-mono"
                        />
                        {errors.phone && <p className="mt-1 text-[10px] text-[#f85149]">{errors.phone}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex items-center gap-2 px-3.5 py-2.5 mt-2 border rounded-lg
                    bg-[rgba(210,153,34,.06)] border-[rgba(210,153,34,.2)]">
                        <span className="p-1 flex items-center justify-center text-[#d29922]">
                            <Key />
                        </span>
                        <span className="text-[11px] text-[#8b949e]">
                            A secure password will be auto-generated and shown after creation.
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 mt-6">
                        <button
                        className="flex-1 py-2.5 text-xs rounded-lg 
                        border border-[#30363d] 
                        bg-[rgba(255,255,255,.04)] text-[#8b949e]
                        hover:bg-[rgba(255,255,255,.08)] transition-colors"
                        onClick={() => setShowModal(false)}
                        >
                            Cancel 
                        </button>
                        <button
                        className="flex items-center justify-center flex-2 gap-1.5 py-2.5 text-xs font-bold 
                        text-white rounded-lg border border-[rgba(88,166,255,.25)]
                        bg-linear-to-r from-[#1c50a0] to-[#58a6ff]
                        shadow-[0_4px_14px_rgba(88,166,255,.2)] hover:opacity-90 transition cursor-pointer"
                        onClick={handleSubmit}
                        >
                            <span>
                                <Plus />
                            </span> 
                            Create Tenant
                        </button>
                        </div>
                </div>
            </div>
            </>
            )}
            </div>
        </div>
    )
}