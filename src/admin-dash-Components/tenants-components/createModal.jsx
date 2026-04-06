import { Check, Key, Plus, X } from "lucide-react";

export default function CreateModal({setShowModal, form, setForm, handleSubmit, createdTenant, setCreatedTenant}) {
    const handleClose = () => {
        setCreatedTenant(null);
        setShowModal(false);
    };
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl w-full lg:max-w-md
            shadow-[0_24px_80px_rgba(3,44,166,0.18)] overflow-hidden animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both]">
                {createdTenant ? (
                    <div className="p-8 flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[rgba(5,150,105,.1)] flex items-center
                        justify-center text-[#059669]">
                            <Check />
                        </div>
                        <div>
                            <div className="font-extrabold text-[16px] text-[#0a1628]">
                                Tenant Created!
                            </div>
                            <div className="text-xs text-[#9aabca] mt-1">
                                Save this password — it won't be shown again.
                            </div>
                        </div>

                        {/* PASSWORD BOX */}
                        <div className="w-full px-4 py-3 rounded-xl bg-[rgba(3,44,166,.04)]
                        border border-[rgba(3,44,166,.12)] flex items-center justify-between gap-3">
                            <span className="font-mono text-sm font-bold text-[#032ca6] tracking-widest">
                                {createdTenant.generated_password}
                            </span>
                            <button
                                onClick={() => navigator.clipboard.writeText(createdTenant.generated_password)}
                                className="text-[10px] text-[#032ca6] border border-[rgba(3,44,166,.2)]
                                bg-[rgba(3,44,166,.06)] px-2 py-1 rounded-md cursor-pointer">
                                Copy
                            </button>
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-full py-2.5 text-xs font-bold text-white rounded-lg
                            bg-[#032ca6] border border-[#032ca6] cursor-pointer mt-2">
                            Done
                        </button>
                    </div>
                ) : (
                <>
                {/* HEADER */}
                <div className="p-[22px_26px_18px] border-b border-[rgba(3,44,166,0.08)] flex items-center
                gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                            <Plus />
                        </div>
                        <div>
                            <div className="font-extrabold text-[16px] text-[#0a1628] tracking-tight">
                                Add New Tenant
                            </div>
                            <div className="mt-0.5 text-[#9aabca] text-xs">
                                Fill in the tenant details below
                            </div>
                        </div>
                    </div>
                    <button className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                    bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                    justify-center"
                    onClick={() => setShowModal(false)}>
                        <X />
                    </button>
                </div>

            {/* FORM STEP */}
            <div className="px-6 py-6.5">
                <div className="flex flex-col gap-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider 
                        uppercase">
                            Name <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="e.g. Mazia Agency"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        type="email"
                        placeholder="user@example.com"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        placeholder="+1 415 555 0192"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center gap-2 px-3.5 py-2.5 mt-2 border rounded-lg
                    bg-[rgba(3,44,166,0.04)] border-[rgba(3,44,166,0.10)]">
                        <span className="p-1 flex items-center justify-center text-amber-500">
                            <Key />
                        </span>
                        <span className="text-[11px] text-[#7a8bb5]">
                            A secure password will be auto-generated and shown after creation.
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 mt-6">
                        <button
                        className="flex-1 py-2.5 text-xs rounded-lg 
                        border border-[rgba(3,44,166,0.14)] 
                        bg-[rgba(3,44,166,0.04)] text-[#7a8bb5]
                        hover:bg-[rgba(3,44,166,0.08)] transition"
                        onClick={() => setShowModal(false)}
                        >
                            Cancel 
                        </button>
                        <button
                        className="flex items-center justify-center flex-2 gap-1.5 py-2.5 text-xs font-bold 
                        text-white rounded-lg border border-[#032ca6] bg-[#032ca6]
                        shadow-md hover:bg-[#02238a] transition cursor-pointer"
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